import express, {Request, Response} from "express";
import {body} from "express-validator";
import {requireAuthMw, validateRequestMw} from "@dkmicro/ticketing";
import {Ticket} from "../models/ticket";

const router = express.Router();
const routeStr = "/api/tickets";

router.get(routeStr, requireAuthMw, async (req: Request, res: Response) => {
    console.log(req.currentUser);
    res.status(200).send("Implement me");
})

router.post(routeStr, requireAuthMw, [
    body('title')
        .isAlphanumeric()
        .withMessage('A valid title is required'),
    body('price')
        .isFloat({gt: 0})
        .withMessage('A positive price is required')
], validateRequestMw, async (req: Request, res: Response) => {
    console.debug(req.currentUser);
    const ticket = await Ticket.build({...req.body, userId: req?.currentUser?.id})

    console.debug("A new ticket was created", JSON.stringify(ticket));

    res.status(201).send(ticket);
})

export {router as ticketsRouter}