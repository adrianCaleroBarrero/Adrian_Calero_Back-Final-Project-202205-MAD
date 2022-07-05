import { User } from '../models/user.model.js';
export const userRequired = async (req, res, next) => {
    const userID = req.tokenPayload.id;
    const findUser = await User.findById(req.params.id);
    if (String(findUser?.favorites) === String(userID)) {
        next();
    }
    else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
