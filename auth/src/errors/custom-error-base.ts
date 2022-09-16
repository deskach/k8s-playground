interface ErrorInstance {
    message: string;
    field?: string;
}

export abstract class CustomErrorBase extends Error {
    abstract statusCode: number;

    protected constructor(message: string) {
        super(message);

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, CustomErrorBase.prototype);
    }

    public abstract serializeErrors(): ErrorInstance[];
}
