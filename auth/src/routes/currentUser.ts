import express, {Request, Response} from "express";
import {isEmpty} from "../util";
// import {requireAuthMw} from "../middlewares/require-auth-mw";

const router = express.Router();

router.get("/api/users/current-user",
    // requireAuthMw,
    (req: Request, res: Response) => {
        const currentUser = req.currentUser;

        if (isEmpty(currentUser)) {
            return res.send({currentUser: null});
        }

        return res.send({currentUser});
    }
)

export {router as currentUserRouter};