/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { iTokenPayload } from '../interfaces/token.js';
import * as aut from '../services/authorization.js';
import { compare, encrypt } from '../services/encrypt.js';

export class UserController<iUser> {
    constructor(public model: Model<iUser>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(
            JSON.stringify(
                await this.model.find().populate('favorites', { __v: 0 })
            )
        );
    };

    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.model
                .findById(req.params.id)
                .populate('favorites');
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
            let newItem: HydratedDocument<any>;

            req.body.passwd = await encrypt(req.body.passwd);
            newItem = await this.model.create(req.body);

            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let findUser: any;
        if (req.body.token) {
            findUser = await this.model.findOne({
                userName: req.body.userName,
                token: req.body.token,
            });
        } else {
            findUser = await this.model.findOne({
                userName: req.body.userName,
            });
        }

        if (!findUser || !(await compare(req.body.passwd, findUser.passwd))) {
            const error = new Error('Invalid user or token');
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
        resp.send({ token, user: findUser });
    };

    patchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const modifyItem = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            resp.setHeader('Content-type', 'application/json');
            resp.send(JSON.stringify(modifyItem));
        } catch (error) {
            next(error);
        }
    };

    deleteController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                const error = new Error('Invalid id');
                error.name = 'UserError';
                next(error);
            }

            const deleteItem = await this.model.findByIdAndDelete(
                req.params.id
            );
            resp.send(JSON.stringify(deleteItem));
        } catch (error) {
            next(error);
        }
    };
}
