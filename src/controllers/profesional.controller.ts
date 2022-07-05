/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

export class ProfesionalController<iProfesional> {
    constructor(public model: Model<iProfesional>) {}

    getAllController = async (req: Request, resp: Response) => {
        const result = await this.model.find();
        console.log(JSON.stringify(result));

        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(result);
    };

    getController = async (req: Request, resp: Response) => {
        const result = await this.model.findById(req.params.id);
        resp.setHeader('Content-type', 'application/json');
        if (result) {
            resp.send(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };

    postController = async (req: Request, resp: Response) => {
        let newItem;

        newItem = await this.model.create(req.body);

        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newItem));
    };
}
