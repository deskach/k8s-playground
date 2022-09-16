import {Request, Response, NextFunction} from 'express';
import {CustomErrorBase} from "../errors/custom-error-base";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomErrorBase) {
        return res.status(err.statusCode)
            .send({errors: err.serializeErrors()});
    }

    return res.status(500)
        .send({errors: [{message: "Something went wrong"}]})
};