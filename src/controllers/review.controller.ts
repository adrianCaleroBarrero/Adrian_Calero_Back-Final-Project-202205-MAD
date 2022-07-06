/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import { iProfesional } from '../models/profesional.model';
import { iReview } from '../models/review.model.js';

export class ReviewController<iReview> {
    constructor(public model: Model<iReview>) {}

    getAllInProfesionalController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');

        resp.send(
            JSON.stringify(
                await this.model
                    .find({ worker: req.params.workerId })
                    .populate('worker')
                    .populate('client')
            )
        );
    };

    postController = async (req: Request, resp: Response) => {
        let newItem;

        newItem = await this.model.create(req.body);

        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newItem));
    };

    patchController = async (req: Request, resp: Response) => {
        const modifyItem = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(modifyItem));
    };

    deleteController = async (req: Request, resp: Response) => {
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.send(JSON.stringify(deleteItem));
    };
}
