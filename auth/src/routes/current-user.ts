import express, {Request, Response} from "express";
import {isEmpty} from "@dkmicro/ticketing/build/util";
import {currentUserMw} from "@dkmicro/ticketing/build/middlewares/current-user-mw";

const router = express.Router();

router.get("/api/users/current-user", currentUserMw,
    (req: Request, res: Response) => {
        const currentUser = req.currentUser;

        if (isEmpty(currentUser)) {
            return res.send({currentUser: null});
        }

        return res.send({currentUser});
    }
)

export {router as currentUserRouter};