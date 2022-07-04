export const userRequired = async (req, res, next) => {
    const userID = req.tokenPayload.id;
    const findRobot = await RobotModel.findById(req.params.id);
    if (String(findRobot?.owner) === String(userID)) {
        next();
    }
    else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
