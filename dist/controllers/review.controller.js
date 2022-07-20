export class ReviewController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAllInProfesionalController = async (req, resp) => {
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(await this.model
            .find({ worker: req.params.workerId })
            .populate('worker')
            .populate('client')));
    };
    postController = async (req, resp, next) => {
        try {
            const newItem = await this.model.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
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
            const deleteItem = await this.model.findByIdAndDelete(req.params.id);
            resp.send(JSON.stringify(deleteItem));
        }
        catch (error) {
            next(error);
        }
    };
}
