import mongoose from 'mongoose';
export class ReviewController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAllInProfesionalController = async (req, resp) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(await this.model
            .find({ worker: req.params.workerId })
            .populate('worker')
            .populate('client')));
    };
    postController = async (req, resp, next) => {
        let newItem;
        try {
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
