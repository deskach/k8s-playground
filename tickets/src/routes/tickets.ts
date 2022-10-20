import express, {Request, Response} from "express";
import {body} from "express-validator";
import {isEmpty, requireAuthMw, validateRequestMw} from "@dkmicro/ticketing";
import {Ticket} from "../models/ticket";
// import {NotFoundError} from "@dkmicro/ticketing/build/errors/not-found-error";

const router = express.Router();
const apiTicketsUrl = "/api/tickets";

const fieldConstraintsMw = [
    body('title').not().isEmpty().withMessage('A valid title is required'),
    body('price').isFloat({gt: 0}).withMessage('A positive price is required')
]

// Retrieves a ticket by id
router.get(`${apiTicketsUrl}/:id`, requireAuthMw, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (isEmpty(ticket)) {
        return res.status(404).send({});
        // throw new NotFoundError("Ticket not found");
    }

    res.status(200).send(ticket);
})

// update a ticket by id
router.put(`${apiTicketsUrl}/:id`, requireAuthMw, fieldConstraintsMw, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (isEmpty(ticket)) {
        return res.status(404).send();
    } else if (ticket?.userId != req?.currentUser?.id) {
        return res.status(401).send();
    }

    ticket!.set(req.body)
    await ticket!.save();

    res.status(200).send(ticket);
})

// Retrieves all tickets
router.get(apiTicketsUrl, requireAuthMw, async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.status(200).send(tickets);
})

router.post(apiTicketsUrl, requireAuthMw, fieldConstraintsMw, validateRequestMw, async (req: Request, res: Response) => {
    const ticket = await Ticket.create({...req.body, userId: req?.currentUser?.id})

    res.status(201).send(ticket);
})

export {router as ticketsRouter}