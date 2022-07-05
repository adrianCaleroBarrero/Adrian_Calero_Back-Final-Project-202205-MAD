import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const createToken = (tokenPayLoad) => {
    const token = jwt.sign(tokenPayLoad, process.env.SECRET);
    return token;
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);
};
