/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { Model } from 'mongoose';

export class ProfesionalController<iProfesional> {
    constructor(public model: Model<iProfesional>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(await this.model.find()));
    };

    getController = async (req: Request, resp: Response) => {
        const result = await this.model.findById(req.params.id);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        resp.setHeader('Content-type', 'application/json');
        if (result) {
            resp.send(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };
}
