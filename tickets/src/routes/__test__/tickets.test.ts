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
        const status = await request(app)
            .post("/api/tickets")
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send({});

        expect(status).not.toEqual(401);
    })

    it('returns an error if invalid title is provided', async () => {
        const res = await request(app)
            .post("/api/tickets")
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send({title: '', price: 10});

        expect(res.status).toBe(400);
    })

    it('returns an error if invalid price is provided', async () => {
        const res = await request(app)
            .post("/api/tickets")
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send({title: 'Test', price: -10});

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

describe('HTTP[GET]: /api/tickets/:id', () => {
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

describe('HTTP[GET]: /api/tickets', () => {
    const tickets = [
        {title: "How scrawny. You endure like a lagoon.", price: 33},
        {title: "Blend each side of the strawberries with four oz of caviar.", price: 21},
        {title: "Diatrias peregrinationes!", price: 18},
    ]
    let cookies: string[] = [];

    beforeEach(async () => {
        cookies = global.signIn();

        for (const data of tickets) {
            await request(app)
                .post("/api/tickets")
                .set('Cookie', cookies) // array is needed to meet supertest's requirements
                .send(data)
                .expect(201)
        }
    })

    it('GET /api/tickets finds and returns all ticket', async () => {
        const res = await request(app)
            .get(`/api/tickets`)
            .set('Cookie', cookies) // array is needed to meet supertest's requirements
            .send({})
            .expect(200);
        const results = res.body as Record<string, any>[];

        expect(results).toBeDefined();
        expect(results.length).toEqual(tickets.length);

        tickets.forEach((data, idx) => {
            const returnedTicket = results.find(t => t.title === data.title && t.price == data.price)

            expect(returnedTicket).toBeDefined();
        })
    })
})

describe('HTTP[PUT]: /api/tickets/:id', () => {
    const tickets = [
        {title: "How scrawny. You endure like a lagoon.", price: 33, id: undefined},
        {title: "Blend each side of the strawberries with four oz of caviar.", price: 21, id: undefined},
        {title: "Diatrias peregrinationes!", price: 18, id: undefined},
    ]
    const ticketUpdates = {title: "It is a cold galaxy, sir.", price: 63};
    let cookies: string[] = [];

    beforeEach(async () => {
        cookies = global.signIn();

        for (const data of tickets) {
            const res = await request(app)
                .post("/api/tickets")
                .set('Cookie', cookies) // array is needed to meet supertest's requirements
                .send(data)
                .expect(201)
            data["id"] = res.body.id;
        }
    })

    it('PUT /api/tickets/:id returns 404 if the ticket is not found', async () => {
        const fakeId = new mongoose.Types.ObjectId().toHexString();
        const res = await request(app)
            .put(`/api/tickets/${fakeId}`)
            .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
            .send(ticketUpdates)

        expect(res.status).toEqual(404);
    })

    it('PUT /api/tickets/:id returns 401 if the user does not own the ticket', async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();
        const ticketId = tickets[0].id;
        const res = await request(app)
            .put(`/api/tickets/${ticketId}`)
            .set('Cookie', global.signIn({id: userId, email: 'test123@test.com'}))
            .send({id: ticketId, ...ticketUpdates, userId})

        expect(res.status).toEqual(401);
    })

    it('PUT /api/tickets/:id finds, updates and returns updated ticket', async () => {
        const ticketId = tickets[0].id;
        const res = await request(app)
            .put(`/api/tickets/${ticketId}`)
            .set('Cookie', cookies) // array is needed to meet supertest's requirements
            .send({id: ticketId, ...ticketUpdates})
            .expect(200);

        expect(res.body).toBeDefined();
        Object.keys(ticketUpdates).forEach(key => expect(res.body).toHaveProperty(key));
        Object.keys(ticketUpdates)
            .forEach((key) => expect(res.body[key])
                .toEqual(ticketUpdates[key as keyof typeof ticketUpdates])
            );
    })
})
