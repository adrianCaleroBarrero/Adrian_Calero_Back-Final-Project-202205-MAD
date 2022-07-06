import { NextFunction, Request, Response } from 'express';

const errors: any = {
    ValidationError: 406,
    CastError: 422,
    UserError: 404,
    UserAuthorizationError: 401,
    TokenError: 401,
};

export const errorControl = (
    error: Error,
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    req;
    next;

    let status = 500;
    if (error.name) status = errors[error.name];
    console.log(error.message);

    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.send(JSON.stringify(result));
};
