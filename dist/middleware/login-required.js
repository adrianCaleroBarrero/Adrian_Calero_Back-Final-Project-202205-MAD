import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const loginRequired = (req, res, next) => {
    const authorization = req.get('authorization');
    let token;
    const tokenError = new Error('token missing or invalid');
    tokenError.name = 'TokenError';
    let decodedToken;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        decodedToken = jwt.verify(token, process.env.SECRET);
        if (typeof decodedToken === 'string') {
            next(tokenError);
        }
        else {
            req.tokenPayload = decodedToken;
            next();
        }
    }
    else {
        next(tokenError);
    }
};
