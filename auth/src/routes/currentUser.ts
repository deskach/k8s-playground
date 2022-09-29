import express, {Request, Response} from "express";
import {isEmpty} from "../util";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/current-user", (req: Request, res: Response) => {
    const EMPTY_USER = {currentUser: null};
    const token = req?.session?.jwt;

    if (isEmpty(token)) {
        return res.send(EMPTY_USER);
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!);

        return res.send(payload);
    } catch (err: any) {
        return res.send(EMPTY_USER);
    }
})

export {router as currentUserRouter};