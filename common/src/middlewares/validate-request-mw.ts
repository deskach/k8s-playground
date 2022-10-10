import {NextFunction, Request, Response} from "express";
import {checkValidationErrors} from "../helpers/validation-helper";

export const validateRequestMw = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    checkValidationErrors(req);

    next();
};
