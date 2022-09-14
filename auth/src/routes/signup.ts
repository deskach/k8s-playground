import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";

const router = express.Router();

router.post("/api/users/signup",
    [
        body('email').isEmail().withMessage('A valid email is required'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be from 4 to 20 chars'),
    ], // ^ middlewares
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new Error("Invalid email or password");
        }

        // const {email, password} = req.body;

        console.log("Creating a user...");

        res.send("signup");
    }
)

export {router as signUpRouter};