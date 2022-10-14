import express, {Request, Response} from "express";
import {currentUserMw, requireAuthMw} from "@dkmicro/ticketing";

const router = express.Router();
const routeStr = "/api/tickets";

router.get(routeStr, requireAuthMw, async (req: Request, res: Response) => {
    res.status(200).send("Implement me");
})

export {router as ticketsRouter}