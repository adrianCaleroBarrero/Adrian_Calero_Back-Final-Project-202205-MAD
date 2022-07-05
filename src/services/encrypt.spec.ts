import bcrypt from 'bcryptjs';
import { compare, encrypt } from './encrypt';

jest.mock('bcryptjs');

describe('Given the module encrypt', () => {
    describe('When i use encrypt function', () => {
        test('Then it should call bcrypt.hash', async () => {
            bcrypt.hash = jest.fn().mockReturnValue({});
            await encrypt('1234', 10);

            expect(bcrypt.hash).toHaveBeenCalled();
        });
    });

    describe('When i use compare function', () => {
        test('Then it should call bcrypt.compare', async () => {
            bcrypt.compare = jest.fn().mockReturnValue(true);
            await compare('1234', '62c41172eb20556e8d48e754');

            expect(bcrypt.compare).toHaveBeenCalled();
        });
    });
});
