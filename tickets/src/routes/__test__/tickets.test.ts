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
    const cookies = global.signIn();

    await request(app)
        .post("/api/tickets")
        .set('Cookie', cookies) // array is needed to meet supertest's requirements
        .send({})
        .expect(200);
})

it('creates a ticket', () => {

})