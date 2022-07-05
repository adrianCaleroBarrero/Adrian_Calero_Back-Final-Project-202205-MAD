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
    getController = async (req, resp) => {
        const result = await this.model
            .findById(req.params.id)
            .populate('favorites');
        resp.setHeader('Content-type', 'application/json');
        if (result) {
            resp.send(JSON.stringify(result));
        }
        else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };
    postController = async (req, resp) => {
        let newItem;
        req.body.passwd = await encrypt(req.body.passwd);
        newItem = await this.model.create(req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newItem));
    };
    loginController = async (req, resp, next) => {
        const findUser = await this.model.findOne({
            userName: req.body.userName,
        });
        if (!findUser || !(await compare(req.body.passwd, findUser.passwd))) {
            const error = new Error('Invalid user or password');
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
        resp.send({ token, id: findUser.id });
    };
    patchController = async (req, resp) => {
        const modifyItem = await this.model.findByIdAndUpdate(req.params.id, req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(modifyItem));
    };
    deleteController = async (req, resp) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return resp
                .status(404)
                .json({ msg: `No task with id :${req.params.id}` });
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.send(JSON.stringify(deleteItem));
    };
}
