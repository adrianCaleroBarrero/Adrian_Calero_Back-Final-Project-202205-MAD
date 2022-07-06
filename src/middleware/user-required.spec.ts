import { NextFunction, Response, Request } from 'express';
import { ExtRequest } from '../interfaces/token';
import { Review } from '../models/review.model';
import { userRequired } from './user-required';

jest.mock('jsonwebtoken');
describe('Given the control error', () => {
    let req: Partial<ExtRequest>;
    let resp: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        (req = {
            params: { id: '1' },
            get: jest.fn(),
            tokenPayload: { id: '1' },
        }),
            (next = jest.fn());
    });
    describe('When use user-required with valid token', () => {
        test('Then should be call next without error', async () => {
            Review.findById = jest.fn().mockReturnValue({ id: '1' });
            req.get = jest.fn().mockReturnValue('bearer token');
            await userRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });

        test('Then should be call next with error', async () => {
            const error = new Error();
            error.name = 'UserAuthorizationError';
            Review.findById = jest.fn().mockReturnValue({ id: '2' });
            req.get = jest.fn().mockReturnValue('bearer token');
            await userRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
