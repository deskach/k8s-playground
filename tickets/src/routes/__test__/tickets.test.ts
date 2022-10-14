import request from 'supertest';
import {app} from "../../app";

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
    await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const res = await request(app)
        .post("/api/tickets")
        .send({})

    expect(res.statusCode).not.toEqual(401);
})

it('creates a ticket', () => {

})