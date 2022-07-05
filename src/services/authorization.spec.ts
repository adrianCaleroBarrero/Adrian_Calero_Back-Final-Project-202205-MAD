import jwt from 'jsonwebtoken';
import { iTokenPayload } from '../interfaces/token';
import { createToken, verifyToken } from './authorization';

jest.mock('jsonwebtoken');

describe('Given the module authorization', () => {
    let tokenPayLoad: iTokenPayload;
    beforeEach(() => {
        tokenPayLoad = {
            id: '',
            name: '',
        };
    });
    describe('When i use createToken function', () => {
        test('Then it should call jwt.sign', () => {
            jwt.sign = jest.fn().mockReturnValue('token');
            const token = createToken(tokenPayLoad);

            expect(jwt.sign).toHaveBeenCalled();
            expect(token).toBe('token');
        });
    });

    describe('When i use veirfyToken function', () => {
        test('Then it should call jwt.verify', () => {
            jwt.verify = jest.fn().mockReturnValue('token');
            const token = verifyToken('token');

            expect(jwt.verify).toHaveBeenCalled();
            expect(token).toBe('token');
        });
    });
});
