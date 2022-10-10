import express, {Request, Response} from "express";
import {body} from "express-validator";
import {createNewUser} from "../helpers/user-helper";
import {validateRequestMw} from "@dkmicro/ticketing/build/middlewares/validate-request-mw";

const router = express.Router();

router.post("/api/users/signup",
    [
        body('email').isEmail().withMessage('A valid email is required'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be from 4 to 20 chars'),
    ],
    validateRequestMw,
    async (req: Request, res: Response) => {
        const user = await createNewUser(req)

        return res.status(201).send(user);
    }
)

export {router as signUpRouter};