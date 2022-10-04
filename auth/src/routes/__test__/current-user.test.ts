import request from 'supertest';
import {app} from "../../app";

it('returns a 201 on successful signup', async () => {
    const testUser = {email: 'test@test.com', password: 'password'}
    const authRes = await request(app)
        .post("/api/users/signup")
        .send(testUser)
        .expect(201);
    const res = await request(app)
        .get("/api/users/current-user")
        .set('Cookie', authRes.get('Set-Cookie'))
        .send()
        .expect(200);

    expect(res.body?.currentUser?.email).toEqual(testUser.email)
})

