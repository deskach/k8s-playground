import {NextFunction, Request, Response} from "express";
import {CustomError} from "../errors/custom-error";
import {isEmpty} from "../util/string";

// This should be always preceded by currentUserMw
export const requireAuthMw = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isEmpty(req.currentUser)) {
        throw new CustomError("Not authorised", 401);
    }

    next();
}