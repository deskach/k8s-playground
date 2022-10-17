import { MongoMemoryServer } from 'mongodb-memory-server';
import { createJWT } from '@dkmicro/ticketing/build/helpers/session-helper';
import mongoose from 'mongoose';
import {randomBytes} from "crypto";

declare global {
    var signin: (creds: Record<string, string>) => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = async ({email = 'test@test.com', password = 'secret'}) => {
    const fakeId = randomBytes(8).toString('hex');

    return createJWT({id: fakeId, email})
};