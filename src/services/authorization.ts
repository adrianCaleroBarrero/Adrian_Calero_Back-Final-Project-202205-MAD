import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { iTokenPayload } from '../interfaces/token';

dotenv.config();

export const createToken = (tokenPayLoad: iTokenPayload) => {
    const token = jwt.sign(tokenPayLoad, process.env.SECRET as string);
    return token;
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.SECRET as string);
};
