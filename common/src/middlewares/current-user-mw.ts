import {NextFunction, Request, Response} from "express";
import {extractCurrentUserFromSession} from "../helpers/session-helper";

export const currentUserMw = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.currentUser = extractCurrentUserFromSession(req);

    next();
};
