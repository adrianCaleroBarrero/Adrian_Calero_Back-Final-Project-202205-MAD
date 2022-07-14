import mongoose from 'mongoose';
import * as aut from '../services/authorization.js';
import { compare, encrypt } from '../services/encrypt.js';
export class UserController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAllController = async (req, resp) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(await this.model.find().populate('favorites', { __v: 0 })));
    };
    getController = async (req, resp, next) => {
        try {
            const result = await this.model
                .findById(req.params.id)
                .populate('favorites');
            resp.setHeader('Content-type', 'application/json');
            if (result) {
                resp.send(JSON.stringify(result));
            }
            else {
                const error = new Error('User not found');
                error.name = 'UserError';
                next(error);
            }
        }
        catch (error) {
            next(error);
        }
    };
    postController = async (req, resp, next) => {
        try {
            let newItem;
            req.body.passwd = await encrypt(req.body.passwd);
            newItem = await this.model.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        }
        catch (error) {
            next(error);
        }
    };
    loginController = async (req, resp, next) => {
        try {
            let findUser;
            if (req.body.token) {
                findUser = await this.model.findOne({
                    userName: req.body.userName,
                    token: req.body.token,
                });
            }
            else {
                findUser = await this.model.findOne({
                    userName: req.body.userName,
                });
            }
            if (!findUser ||
                !(await compare(req.body.passwd, findUser.passwd))) {
                const error = new Error('Invalid user or token');
                error.name = 'UserAuthorizationError';
                next(error);
                return;
            }
            const tokenPayload = {
                id: findUser.id,
                name: findUser.name,
            };
            const token = aut.createToken(tokenPayload);
            resp.setHeader('Content-type', 'application/json');
            resp.status(202);
            resp.send({ token, user: findUser });
        }
        catch (error) {
            next(error);
        }
    };
    patchController = async (req, resp, next) => {
        try {
            const modifyItem = await this.model.findByIdAndUpdate(req.params.id, req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.send(JSON.stringify(modifyItem));
        }
        catch (error) {
            next(error);
        }
    };
    deleteController = async (req, resp, next) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                const error = new Error('Invalid id');
                error.name = 'UserError';
                next(error);
            }
            const deleteItem = await this.model.findByIdAndDelete(req.params.id);
            resp.send(JSON.stringify(deleteItem));
        }
        catch (error) {
            next(error);
        }
    };
}
