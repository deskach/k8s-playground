import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {
    constructor(
        public message = 'Not found',
        public statusCode = 404
    ) {
        super(message, statusCode);

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
