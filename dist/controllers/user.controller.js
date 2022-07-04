import mongoose from 'mongoose';
import * as aut from '../services/authorization.js';
export class UserController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAllController = async (req, resp) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(await this.model.find().populate('favorites')));
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
    postController = async (req, resp, next) => {
        let newItem;
        try {
            req.body.passwd = await aut.encrypt(req.body.passwd);
            newItem = await this.model.create(req.body);
            if (!newItem) {
                throw new Error('Need data');
            }
        }
        catch (error) {
            next(error);
            return;
        }
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newItem));
    };
    loginController = async (req, resp, next) => {
        const findUser = await this.model.findOne({
            userName: req.body.userName,
        });
        if (!findUser ||
            !(await aut.compare(req.body.passwd, findUser.passwd))) {
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
    deleteController = async (req, resp) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return resp
                .status(404)
                .json({ msg: `No task with id :${req.params.id}` });
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.send(JSON.stringify(deleteItem));
    };
}
