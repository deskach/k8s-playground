import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {currentUserRouter} from './routes/currentUser';
import {signInRouter} from "./routes/signIn";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";
import * as mongoose from "mongoose";
import {DatabaseConnectionError} from "./errors/database-connection-error";
import {isEmpty, noop} from "./util";
import {CustomError} from "./errors/custom-error";

const PORT = 3000;
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

const checkEnv = () => {
    if (isEmpty(process.env.JWT_KEY)) {
        throw new CustomError("JWT_KEY env var must be defined");
    }
}

const start = async () => {
    const connStr = "mongodb://auth-mongo-srv:27017/auth";

    checkEnv();

    try {
        await mongoose.connect(connStr);
        console.log(`Connected to ${connStr}`);
    } catch (err) {
        console.log("Failed connecting to ", connStr);
        throw new DatabaseConnectionError((err as Error).message);
    }

    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

start().catch(noop);