import request from 'supertest';
import {app} from "../../app";

it('has /api/tickets route for post requests', async () => {
    const res = await request(app)
        .post("/api/tickets")
        .send({})
    expect(res.status).not.toEqual(404);
})

it('requires user to be signed id', () => {

})

it('creates a ticket', () => {

})