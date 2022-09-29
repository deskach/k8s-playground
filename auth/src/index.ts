import 'express-async-errors';
import * as mongoose from "mongoose";
import {isEmpty, noop} from "./util";
import {CustomError} from "./errors/custom-error";
import {app} from "./app";

const PORT = 3000;

const checkEnv = () => {
    const {JWT_KEY} = process.env

    if (isEmpty(JWT_KEY)) {
        throw new CustomError(`JWT_KEY env var "${JWT_KEY}" is invalid`);
    }

    console.log(`JWT_KEY is "${JWT_KEY}"`);
}

const start = async () => {
    const connStr = "mongodb://auth-mongo-srv:27017/auth";

    try {
        checkEnv();
        await mongoose.connect(connStr);
        console.log(`Connected to ${connStr}`);
    } catch (err: any) {
        console.error(err.message);
        throw err;
    }

    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

start().catch(noop);