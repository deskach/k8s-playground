import request from 'supertest';
import {app} from '../../app';

it('it succeeds with correct credentials', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const res = await request(app)
        .get("/api/users/signout")
        .send({})
        .expect(200);
    const expiredCookie = '["session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"]';

    expect(JSON.stringify(res.get('Set-Cookie'))).toEqual(expiredCookie)
});
