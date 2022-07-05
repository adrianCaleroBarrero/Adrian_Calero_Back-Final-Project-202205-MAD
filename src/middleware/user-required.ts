import { Request, Response, NextFunction } from 'express';
import { ExtRequest } from '../interfaces/token.js';
import { User } from '../models/user.model.js';

export const userRequired = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const findUser = await User.findById(req.params.id);
    if (String(findUser?.favorites) === String(userID)) {
        next();
    } else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
