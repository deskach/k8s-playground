import {Request} from "express";
import {isEmpty} from "../util";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
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