import request from 'supertest';
import {app} from "../../app";
import {Ticket} from "../../models/ticket";

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

    await request(app)
        .post("/api/tickets")
        .set('Cookie', cookies) // array is needed to meet supertest's requirements
        .send({})
        .expect(200);
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
    const data = {title: "chest", price: 33};
    await request(app)
        .post("/api/tickets")
        .set('Cookie', global.signIn()) // array is needed to meet supertest's requirements
        .send({title: "chest", price: 33})
        .expect(201);

    const createdTicket = await Ticket.findOne(data);

    expect(createdTicket).toBeDefined();
    Object.keys(data).forEach(key => expect(createdTicket).toHaveProperty(key));
    Object.keys(data).forEach((key) => expect(createdTicket?.get(key)).toEqual(data[key as keyof typeof data]));
})