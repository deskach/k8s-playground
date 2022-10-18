import {NextFunction, Request, Response} from "express";
import {CustomError} from "../errors/custom-error";
import {isEmpty} from "../util";
import {extractCurrentUserFromSession} from "../helpers/session-helper";

export const requireAuthMw = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const currentUser = extractCurrentUserFromSession(req);

    if (isEmpty(currentUser)) {
        throw new CustomError("Not authorised", 401);
    }

    req.currentUser = currentUser

    next();
}