import { server } from '..';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../app';

describe('Given the routes of /user', () => {
    let data: { [key: string]: Array<any> };
    let token: string;
    beforeEach(async () => {
        data = await initDB();
        await mongooseConnect();
        token = jwt.sign(
            { id: data.users[0].id, name: data.users[0].name },
            process.env.SECRET as string
        );
    });
    afterEach(async () => {
        server.close();
    });
    describe('When method GET is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get('/user/');
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method GET with /:id is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get(
                `/user/${data.users[0].id}`
            );
            expect(response.statusCode).toBe(200);
        });

        test('Then status should be 404', async () => {
            const response = await request(app).get(
                '/user/62c41172eb22256e8d48e754'
            );

            expect(response.statusCode).toBe(404);
        });
    });

    describe('When method POST with /register is used', () => {
        test('Then status should be 201', async () => {
            const newUser = {
                userName: 'jesus',
                email: 'jesus@isdi.com',
                passwd: '1234',
            };
            const response = await request(app)
                .post('/user/register/')
                .send(newUser);
            expect(response.statusCode).toBe(201);
        });

        test('Then status should be 404', async () => {
            const response = await await request(app)
                .post('/user/register')
                .send({ passwd: '1234' });

            expect(response.statusCode).toBe(406);
        });
    });

    describe('When method POST with login is used', () => {
        test('Then status should be 202', async () => {
            const loginUser = {
                userName: data.users[0].userName,
                passwd: '1234',
            };
            const response = await request(app)
                .post('/user/login')
                .send(loginUser);
            expect(response.statusCode).toBe(202);
        });

        test('Then status should be 401', async () => {
            const loginUser = {
                userName: data.users[0].userName,
                passwd: '123456',
            };
            const response = await request(app)
                .post('/user/login')
                .send(loginUser);
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When method PATCH is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).patch(
                `/user/${data.users[0].id}`
            );

            expect(response.statusCode).toBe(401);
        });

        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .patch(`/user/${data.users[0].id}`)
                .set('authorization', 'Bearer ' + token)
                .send({ userName: 'test' });

            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method DELETE is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).delete(
                `/user/${data.users[0].id}`
            );

            expect(response.statusCode).toBe(401);
        });

        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .delete(`/user/${data.users[0].id}`)
                .set('authorization', 'Bearer ' + token)
                .send(data.users[0].id);

            expect(response.statusCode).toBe(200);
        });

        test('If I am logged but with invalid id, then status should be 404', async () => {
            const response = await request(app)
                .delete('/user/62c41172eb20556e2248e7')
                .set('authorization', 'Bearer ' + token);

            expect(response.statusCode).toBe(404);
        });
    });
});
