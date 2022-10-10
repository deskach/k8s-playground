import express, {Request, Response} from "express";
import {body} from "express-validator";
import {findUser} from "../helpers/user-helper";
import {isEmpty} from "@dkmicro/ticketing/build/util";
import {BadRequestError} from "@dkmicro/ticketing/build/errors/bad-request-errot";
import {validateRequestMw} from "@dkmicro/ticketing/build/middlewares/validate-request-mw";
import {PasswordHelper} from "../helpers/password-helper";

const router = express.Router();

router.post("/api/users/signin",
    [
        body('email')
            .isEmail()
            .withMessage('A valid email is required'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required'),
    ],
    validateRequestMw,
    async (req: Request, res: Response) => {
        const {email, password: suppliedPassword} = req.body
        const user = await findUser(req)

        if (isEmpty(user)) {
            throw new BadRequestError(`Email ${email} not found`)
        } else if (!await PasswordHelper.compare(user?.password ?? '', suppliedPassword)) {
            throw new BadRequestError('Invalid password')
        }

        res.status(200).send(user);
    })

export {router as signInRouter};