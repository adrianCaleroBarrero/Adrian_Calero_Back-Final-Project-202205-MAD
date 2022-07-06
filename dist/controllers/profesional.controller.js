export class ProfesionalController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAllController = async (req, resp) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(await this.model.find());
    };
    getController = async (req, resp) => {
        const result = await this.model.findById(req.params.id);
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
        newItem = await this.model.create(req.body);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newItem));
    };
}
