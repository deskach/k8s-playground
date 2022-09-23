import {Request} from "express";
import {User, UserDoc} from "../models/user";
import jwt from "jsonwebtoken";
import {isEmpty} from "../util";
import {BadRequestError} from "../errors/bad-request-errot";

const addJWT2Req = (req: Request, user: UserDoc) => {
    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {jwt: userJWT};
}

export const createNewUser = async (req: Request) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (!isEmpty(existingUser)) {
        console.log('Email in use')
        // throw new CustomError('Email in use', 409);
        throw new BadRequestError('Email in use');
    }

    const user = await User.build({email, password});

    await user.save();
    addJWT2Req(req, user);

    return user;
}

