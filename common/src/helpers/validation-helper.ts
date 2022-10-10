import {Request} from "express";
import {validationResult} from "express-validator";
import {RequestValidationError} from "../errors/request-validation-error";

export const checkValidationErrors = (req: Request) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
}