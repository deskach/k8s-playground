import {isEmpty} from "./string";
import {CustomError} from "../errors/custom-error";

export const checkEnv = () => {
    const {JWT_KEY, MONGO_URI} = process.env;

    [JWT_KEY, MONGO_URI].forEach(envVar => {
        if (isEmpty(envVar)) {
            throw new CustomError(`JWT_KEY env var "${envVar}" is invalid`);
        }
    })
}
