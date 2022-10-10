import {CustomError} from "./custom-error";

export class BadRequestError extends CustomError {
    constructor(
        public message = 'Bad request',
        public statusCode = 400
    ) {
        super(message, statusCode);

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
