import express, {Request, Response} from "express";
import {body} from "express-validator";
import {findUser} from "../helpers/user-helper";
import {isEmpty} from "../util";
import {BadRequestError} from "../errors/bad-request-errot";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.get("/api/users/signin",
    [
        body('email')
            .isEmail()
            .withMessage('A valid email is required'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email} = req.body
        const user = await findUser(email)

        if (isEmpty(user)) {
            throw new BadRequestError(`Email ${email} not found`)
        }

        res.status(200).send(user);
    })

export {router as signInRouter};