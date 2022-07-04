/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { iTokenPayload } from '../interfaces/token.js';
import * as aut from '../services/authorization.js';

export class UserController<iUser> {
    constructor(public model: Model<iUser>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(
            JSON.stringify(await this.model.find().populate('favorites'))
        );
    };

    getController = async (req: Request, resp: Response) => {
        const result = await this.model
            .findById(req.params.id)
            .populate('favorites');
        resp.setHeader('Content-type', 'application/json');
        if (result) {
            resp.send(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let newItem: HydratedDocument<any>;
        try {
            req.body.passwd = await aut.encrypt(req.body.passwd);
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

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const findUser: any = await this.model.findOne({
            userName: req.body.userName,
        });
        if (
            !findUser ||
            !(await aut.compare(req.body.passwd, findUser.passwd))
        ) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayload: iTokenPayload = {
            id: findUser.id,
            name: findUser.name,
        };
        const token = aut.createToken(tokenPayload);
        resp.setHeader('Content-type', 'application/json');
        resp.status(202);
        resp.send({ token, id: findUser.id });
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
