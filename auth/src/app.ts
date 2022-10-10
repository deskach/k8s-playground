import express from "express";
import {json} from "body-parser";
import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signIn";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import cookieSession from "cookie-session";
import {NotFoundError} from "@dkmicro/ticketing/build/errors/not-found-error";
import {errorHandlerMw} from "@dkmicro/ticketing/build/middlewares/error-handler-mw";

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    sameSite: "strict",
}))

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
    throw new NotFoundError("url not found")
});

app.use(errorHandlerMw);

export {app}