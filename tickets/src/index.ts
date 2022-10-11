import 'express-async-errors';
import * as mongoose from "mongoose";
import {app} from "./app";
import {isEmpty, noop} from "@dkmicro/ticketing/build/util";
import {CustomError} from "@dkmicro/ticketing";

const PORT = 3000;

const checkEnv = () => {
    const {JWT_KEY, MONGO_URI} = process.env;

    [JWT_KEY, MONGO_URI].forEach(envVar => {
        if (isEmpty(envVar)) {
            throw new CustomError(`JWT_KEY env var "${envVar}" is invalid`);
        }
    })
}

const start = async () => {
    const connStr = process.env.MONGO_URI as string;

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