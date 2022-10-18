import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {randomBytes} from "crypto";
import {createJWT, JWTData} from "@dkmicro/ticketing";

type SignInFunc = (data?: Partial<JWTData>, secret?: string) => string[];

declare global {
    var signIn: SignInFunc;
}

let mongo: any;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})

    process.env.JWT_KEY = 'asdf';
    process.env.MONGO_URI = mongoUri;
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

const getFakeId = (): string => randomBytes(8).toString('hex');
const defaultJWTData: JWTData = {email: 'test@test.com', id: getFakeId()}

global.signIn = (
    data = defaultJWTData,
    secret = process.env.JWT_KEY!
) => {
    const {id, email} = {...defaultJWTData, ...data};
    const jwtPayload = createJWT({id, email}, secret);
    const sessionEntry = {jwt: jwtPayload};
    const sessionStr =  JSON.stringify(sessionEntry);
    const cookie = Buffer.from(sessionStr).toString('base64');

    return [`session=${cookie}`]
};