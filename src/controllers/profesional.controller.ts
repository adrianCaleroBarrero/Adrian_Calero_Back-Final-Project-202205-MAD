/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

export class ProfesionalController<iProfesional> {
    constructor(public model: Model<iProfesional>) {}

    getAllController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        resp.send(await this.model.find());
    };

    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.model.findById(req.params.id);
            resp.setHeader('Content-type', 'application/json');
            if (result) {
                resp.send(JSON.stringify(result));
            } else {
                const error = new Error('User not found');
                error.name = 'UserError';
                next(error);
            }
        } catch (error) {
            next(error);
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            let newItem;
            newItem = await this.model.create(req.body);

            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };
}
