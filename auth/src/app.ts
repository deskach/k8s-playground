import express from "express";
import {json} from "body-parser";
import {currentUserRouter} from "./routes/currentUser";
import {signInRouter} from "./routes/signIn";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import cookieSession from "cookie-session";
import {NotFoundError} from "./errors/not-found-error";
import {errorHandlerMw} from "./middlewares/error-handler-mw";
import {currentUserMw} from "./middlewares/current-user-mw";

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(errorHandlerMw);
app.use(currentUserMw);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
    throw new NotFoundError("url not found")
});

export {app}