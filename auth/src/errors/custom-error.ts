import {CustomErrorBase} from "./custom-error-base";

export class CustomError extends CustomErrorBase {
    constructor(
        public message = 'Something went wrong',
        public statusCode = 500
    ) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    public serializeErrors() {
        return [
            {message: this.message}
        ]
    }
}
