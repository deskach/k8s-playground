import 'express-async-errors';
import * as mongoose from "mongoose";
import {app} from "./app";
import {checkEnv, noop} from '@dkmicro/ticketing'

const PORT = 3000;

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