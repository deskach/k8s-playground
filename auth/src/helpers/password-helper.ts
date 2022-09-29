import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';
import {isEmpty} from "../util";

const scryptAsync = promisify(scrypt);

export class PasswordHelper {
    static async toHash(password: string, salt = ''): Promise<string> {
        salt = isEmpty(salt) ? randomBytes(8).toString('hex') : salt;
        const buf = await scryptAsync(password, salt, 64) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [_, salt] = storedPassword.split(".");
        const suppliedPasswordHashed = await this.toHash(suppliedPassword, salt);

        return storedPassword == suppliedPasswordHashed;
    }
}