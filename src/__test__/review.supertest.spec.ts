import { server } from '..';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';
import { Review } from '../models/review.model';
import { Profesional } from '../models/profesional.model';
import { User } from '../models/user.model';

describe('Given the routes of /review', () => {
    let data: { [key: string]: Array<any> };
    let token: string;

    beforeEach(async () => {
        await Review.deleteMany({});
        await Profesional.deleteMany({});
        await User.deleteMany({});
        data = await initDB();
        await mongooseConnect();
        token = jwt.sign(
            { id: data.users[0].id, name: data.users[0].name },
            process.env.SECRET as string
        );
    });
    afterEach(async () => {
        await server.close();
    });
    describe('When method GET with /:workerId is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app)
                .get(`/review/${data.profesionals[0].id}`)
                .set('authorization', 'Bearer ' + token);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method POST is used', () => {
        test('Then status should be 201', async () => {
            const newReview = {
                worker: data.profesionals[0].id,
                client: data.users[0].id,
                date: '10-02-2300',
                reviews: {
                    img: [],
                    video: [],
                    comment: 'testing',
                    score: 5,
                },
            };

            const response = await request(app)
                .post('/review/')
                .set('authorization', 'Bearer ' + token)
                .send(newReview);

            expect(response.statusCode).toBe(201);
        });
    });

    describe('When method PATCH is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app)
                .patch(`/review/${data.reviews[0].id}`)
                .set('authorization', 'Bearer ' + token)
                .send({ date: '10-02-2300' });

            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method DELETE is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app)
                .delete(`/review/${data.reviews[0].id}`)
                .set('authorization', 'Bearer ' + token);

            expect(response.statusCode).toBe(200);
        });
    });
});
