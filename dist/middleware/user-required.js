import { Review } from '../models/review.model.js';
export const userRequired = async (req, res, next) => {
    const userID = req.tokenPayload.id;
    const foundRevuew = await Review.findById(req.params.id);
    if (String(foundRevuew?.client) === String(userID)) {
        next();
    }
    else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
