import request from 'supertest';
import {app} from '../../app';

xit('it fails if email does not exist', async () => {
    // TODO: Fix me
    return request(app)
        .get("/api/users/signin")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('it succeeds with correct credentials', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const res = await request(app)
        .get("/api/users/signin")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();
});
