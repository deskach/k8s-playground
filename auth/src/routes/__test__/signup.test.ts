import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
})

it('returns a 400 with invalid credentials', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test_test.com',
            password: 'pwd'
        })
        .expect(400);
})

jest.setTimeout(10000);

xit('Prohibits duplicate emails', async () => {
    //TODO: Fix me

    await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test1@test.com',
            password: 'passwd'
        })
        .expect(201);

    await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test1@test.com',
            password: 'passwd1'
        })
        .expect(400);
})

it('Sets a cookie on signup', async () => {

    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test1@test.com',
            password: 'passwd'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})