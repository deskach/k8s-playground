import request from 'supertest';
import {app} from "../../app";
import {Ticket} from "../../models/ticket";
import mongoose from "mongoose";

describe('HTTP[POST]: /api/tickets', () => {
    it('has /api/tickets route for post requests', async () => {
        const res = await request(app)
            .post("/api/tickets")
            .send({})

        expect(res.status).not.toEqual(404);
    })

    it('requires user to be signed id', async () => {
        await request(app)
            .post("/api/tickets")
            .send({})
            .expect(401);
    })

    it('does not return 401 if the user is signed in', async () => {
        const cookies = global.signIn();

        const status = await request(app)
            .post("/api/tickets")
            .set('Cookie', cookies) // array is needed to meet supertest's requirements
            .send({});

        expect(status).not.toEqual(401);
    })

    it('returns an error if invalid title is provided', async () => {
        const payload = {title: '', price: 10};
        const res = await request(app)
            .post("/api/tickets")
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send(payload);

        expect(res.status).toBe(400);
    })

    it('returns an error if invalid price is provided', async () => {
        const payload = {title: 'Test', price: -10};
        const res = await request(app)
            .post("/api/tickets")
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send(payload);

        expect(res.status).toBe(400);
    })

    it('creates a ticket', async () => {
        const data = {title: "How scrawny. You endure like a lagoon.", price: 33};
        await request(app)
            .post("/api/tickets")
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send(data)
            .expect(201);

        const createdTicket = await Ticket.findOne(data);

        expect(createdTicket).toBeDefined();
        Object.keys(data).forEach(key => expect(createdTicket).toHaveProperty(key));
        Object.keys(data).forEach((key) => expect(createdTicket?.get(key)).toEqual(data[key as keyof typeof data]));
    })
})

describe('HTTP[GET]: /api/tickets/id', () => {
    it('GET /api/tickets/:id returns 404 if the ticket is not found', async () => {
        // const fakeId = randomBytes(12).toString('hex');
        const fakeId = new mongoose.Types.ObjectId().toHexString();
        const res = await request(app)
            .get(`/api/tickets/${fakeId}`)
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send({})

        expect(res.status).toEqual(404);
    })

    it('GET /api/tickets/:id finds and returns existing ticket', async () => {
        const data = {title: "How scrawny. You endure like a lagoon.", price: 33};
        const cookies = global.signIn();
        const ticket = await request(app)
            .post("/api/tickets")
            .set('Cookie', cookies) // array is needed to meet supertest's requirements
            .send(data)
            .expect(201);
        const res = await request(app)
            .get(`/api/tickets/${ticket.body.id}`)
            .set('Cookie', cookies) // array is needed to meet supertest's requirements
            .send({})
            .expect(200);
        const returnedTicket = res.body as Record<string, any>;

        expect(returnedTicket).toBeDefined();
        Object.keys(data).forEach(key => expect(returnedTicket).toHaveProperty(key));
        Object.keys(data).forEach((key) => expect(returnedTicket[key]).toEqual(data[key as keyof typeof data]));
    })
})