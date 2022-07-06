import { NextFunction, Response, Request } from 'express';
import { loginRequired } from './login-required';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
describe('Given the control error', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        (req = { get: jest.fn() }), (next = jest.fn());
    });
    describe('When send a error', () => {
        test('Then should be call next without error', async () => {
            req.get = jest.fn().mockReturnValue('bearer token');
            jwt.verify = jest.fn().mockReturnValue('string');
            await loginRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });

        test('Then should be call with tokenError', async () => {
            const tokenError = new Error('token missing or invalid');
            req.get = jest.fn().mockReturnValue('test token');
            jwt.verify = jest.fn().mockReturnValue('string');
            await loginRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalledWith(tokenError);
        });

        test('If i do not send a good token, then should be call with tokenError', async () => {
            const tokenError = new Error('token missing or invalid');
            req.get = jest.fn().mockReturnValue('bearer token');

            await loginRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalledWith(tokenError);
        });
    });
});
