import {CustomError} from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    constructor(
        private reason = 'Error connecting to the database',
        public statusCode = 500
    ) {
        super(reason, statusCode);

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}