import {Request} from "express";
import {User, UserDoc} from "../models/user";
import jwt from "jsonwebtoken";
import {isEmpty} from "@dkmicro/ticketing/build/util";
import {BadRequestError} from "@dkmicro/ticketing";

const addJWT2Req = (req: Request, user: UserDoc) => {
    const jwtData = {
        id: user.id,
        email: user.email
    }
    const userJWT = jwt.sign(jwtData, process.env.JWT_KEY!);

    req.session = {jwt: userJWT};
}

export const findUser = async (req: Request) => {
    const {email} = req.body
    const user = await User.findOne({email});

    if (!isEmpty(user)) {
        addJWT2Req(req, user as unknown as UserDoc);
    }

    return user;
}

export const createNewUser = async (req: Request) => {
    const {email, password} = req.body;
    const existingUser = await findUser(req);

    if (!isEmpty(existingUser)) {
        const msg = `Email "${email}" is in use`;
        throw new BadRequestError(msg);
    }

    const user = await User.build({email, password});

    await user.save();
    addJWT2Req(req, user);

    return user;
}

