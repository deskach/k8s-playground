import {Request, Response, NextFunction} from 'express';
import {CustomErrorBase} from "../errors/custom-error-base";

export const errorHandlerMw = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomErrorBase) {
        return res.status(err.statusCode)
            .send({errors: err.serializeErrors()});
    }

    console.error(err);

    return res.status(500)
        .send({errors: [{message: err.message}]})
};