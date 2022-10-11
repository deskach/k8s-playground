import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {isEmpty} from "../util/string";

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

export const currentUserMw = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req?.session?.jwt;

    if (isEmpty(token)) {
        return next();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!);

        req.currentUser = payload as UserPayload;
    } catch (err: any) {
        req.currentUser = undefined;
    }

    next();
};
