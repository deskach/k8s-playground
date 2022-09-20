import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {RequestValidationError} from "../errors/request-validation-error";
import {User} from "../models/user";
import {isEmpty} from "../util";
import {BadRequestError} from "../errors/bad-request-errot";

const router = express.Router();

router.post("/api/users/signup",
    [
        body('email').isEmail().withMessage('A valid email is required'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be from 4 to 20 chars'),
    ], // ^ array of middlewares
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const user = await createNewUser(req)

        return res.status(201).send(user);
    }
)

const createNewUser = async (req: Request) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (!isEmpty(existingUser)) {
        console.log('Email in use')
        // throw new CustomError('Email in use', 409);
        throw new BadRequestError('Email in use');
    }

    const user = await User.build({email, password});
    await user.save();

    return user;
}

export {router as signUpRouter};