import {NextFunction, Request, Response} from "express";
import {extractCurrentUserFromSession, UserPayload} from "../helpers/session-helper";

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
    req.currentUser = extractCurrentUserFromSession(req);

    next();
};
