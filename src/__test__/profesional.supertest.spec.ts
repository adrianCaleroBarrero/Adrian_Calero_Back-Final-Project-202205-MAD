import { server } from '..';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose';
import request from 'supertest';
import { app } from '../app';
import { Review } from '../models/review.model';
import { Profesional } from '../models/profesional.model';
import { User } from '../models/user.model';

describe('Given the routes of /user', () => {
    let data: { [key: string]: Array<any> };

    beforeEach(async () => {
        await Review.deleteMany({});
        await Profesional.deleteMany({});
        await User.deleteMany({});
        data = await initDB();
        await mongooseConnect();
    });
    afterEach(async () => {
        server.close();
    });
    describe('When method GET is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get('/profesional/');
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method GET with /:id is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get(
                `/profesional/${data.profesionals[0].id}`
            );
            expect(response.statusCode).toBe(200);
        });

        test('Then status should be 404', async () => {
            const response = await request(app).get(
                '/profesional/62c41172eb22256e8d48e754'
            );

            expect(response.statusCode).toBe(404);
        });
    });

    describe('When method POST is used', () => {
        test('Then status should be 201', async () => {
            const newProfesional = {
                avatar: 'url',
                name: 'test',
                profesion: 'jest',
                info: {
                    description: 'testing',
                    price: 4,
                    img: 'url',
                    video: 'url',
                },
            };
            const response = await request(app)
                .post('/profesional/')
                .send(newProfesional);
            expect(response.statusCode).toBe(201);
        });
    });
});
