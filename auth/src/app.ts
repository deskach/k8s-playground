import express from "express";
import {json} from "body-parser";
import {currentUserRouter} from "./routes/currentUser";
import {signInRouter} from "./routes/signIn";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import cookieSession from "cookie-session";
import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";

const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(cookieSession({name: 'session', keys: ['jwt']}))

app.all('*', async () => {
    throw new NotFoundError("url not found")
});
app.use(errorHandler);

export {app}