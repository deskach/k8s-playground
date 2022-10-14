import {Request} from "express";
import {isEmpty} from "../util";
import jwt from "jsonwebtoken";

export interface UserPayload {
    id: string;
    email: string;
}

export interface JWTData {
    id: string;
    email: string;
}

export const createJWT = (data: JWTData, secret: string) => {
    return jwt.sign(data, secret);
}


export const extractCurrentUserFromSession = (req: Request): UserPayload | undefined => {
    const token = req?.session?.jwt;

    if (isEmpty(token)) {
        return undefined;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!);

        return payload as UserPayload;
    } catch (err: any) {
        return undefined;
    }
}