/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import { iProfesional } from '../models/profesional.model';
import { iReview } from '../models/review.model.js';

export class ReviewController<iReview> {
    constructor(public model: Model<iReview>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');

        resp.send(
            JSON.stringify(
                await this.model
                    .find({ worker: req.params.id })
                    .populate('worker')
                    .populate('client')
            )
        );
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let newItem;
        try {
            newItem = await this.model.create(req.body);
            if (!newItem) {
                throw new Error('Need data');
            }
        } catch (error) {
            next(error);
            return;
        }
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
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return resp
                .status(404)
                .json({ msg: `No task with id :${req.params.id}` });
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.send(JSON.stringify(deleteItem));
    };
}
