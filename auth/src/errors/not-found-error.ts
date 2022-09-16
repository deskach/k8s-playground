import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {
    constructor(
        public message = 'Not found',
        public statusCode = 404
    ) {
        super(message);

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    public serializeErrors() {
        return [
            {message: this.message}
        ]
    }
}
