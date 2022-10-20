import express, {Request, Response} from "express";
import {body} from "express-validator";
import {isEmpty, requireAuthMw, validateRequestMw} from "@dkmicro/ticketing";
import {Ticket} from "../models/ticket";
// import {NotFoundError} from "@dkmicro/ticketing/build/errors/not-found-error";

const router = express.Router();
const routeStr = "/api/tickets";

router.get(`${routeStr}/:id`, requireAuthMw, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (isEmpty(ticket)) {
        return res.status(404).send({});
        // throw new NotFoundError("Ticket not found");
    }

    res.status(200).send(ticket);
})

router.get(routeStr, requireAuthMw, async (req: Request, res: Response) => {
    res.status(200).send("Implement me");
})

router.post(routeStr, requireAuthMw, [
    body('title').not().isEmpty().withMessage('A valid title is required'),
    body('price').isFloat({gt: 0}).withMessage('A positive price is required')
], validateRequestMw, async (req: Request, res: Response) => {
    const ticket = await Ticket.create({...req.body, userId: req?.currentUser?.id})

    res.status(201).send(ticket);
})

export {router as ticketsRouter}