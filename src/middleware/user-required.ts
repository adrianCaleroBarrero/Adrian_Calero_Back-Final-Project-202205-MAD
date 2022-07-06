import { Request, Response, NextFunction } from 'express';
import { ExtRequest } from '../interfaces/token.js';
import { Review } from '../models/review.model.js';

export const userRequired = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const foundRevuew = await Review.findById(req.params.id);

    if (String(foundRevuew?.client) === String(userID)) {
        next();
    } else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
