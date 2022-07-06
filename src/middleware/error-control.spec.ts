import { NextFunction, Request, Response } from 'express';
import { errorControl } from './error-control';

describe('Given the control error', () => {
    let req: Request;
    let resp: Partial<Response>;
    let next: NextFunction;
    let error: Error;

    beforeEach(() => {
        (resp = { send: jest.fn(), status: jest.fn() }),
            (error = {
                name: 'UserAuthorizationError',
                message: 'test',
            });
    });
    describe('When send a error', () => {
        test('Then should be a status with her error name', () => {
            errorControl(error, req, resp as Response, next);
            expect(resp.status).toHaveBeenCalledWith(401);
        });
    });
});
