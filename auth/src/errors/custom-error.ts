interface ErrorInstance {
    message: string;
    field?: string;
}

export abstract class CustomError extends Error {
    abstract statusCode: number;

    protected constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    public abstract serializeErrors(): ErrorInstance[];
}
