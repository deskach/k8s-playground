import {ValidationError} from 'express-validator';
import {CustomErrorBase} from "./custom-error-base";

export class RequestValidationError extends CustomErrorBase {
    constructor(
        private errors: ValidationError[],
        public statusCode = 400
    ) {
        super("Invalid request parameters");

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public serializeErrors() {
        return this.errors.map(err => ({message: err.msg, field: err.param}))
    }
}