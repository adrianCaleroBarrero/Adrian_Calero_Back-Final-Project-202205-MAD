import { Profesional } from '../models/profesional.model';
import { ProfesionalController } from './profesional.controller';
jest.mock('../models/profesional.model');
describe('Given the user controller', () => {
    process.env.URL_MONGO_TEST = '';
    console.log('Process env url test', process.env.URL_MONGO_TEST);
    let controller;
    let req;
    let resp;
    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
        };
        resp = {
            setHeader: jest.fn(),
            send: jest.fn(),
            status: jest.fn(),
        };
        controller = new ProfesionalController(Profesional);
    });
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            Profesional.find = jest.fn().mockReturnValue({});
            await controller.getAllController(req, resp);
            expect(Profesional.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
    describe('When use getController', () => {
        test('Then should send a response', async () => {
            Profesional.findById = jest.fn().mockReturnValue({});
            await controller.getController(req, resp);
            expect(Profesional.findById).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then should send a status 404', async () => {
            Profesional.findById = jest.fn().mockReturnValue(undefined);
            await controller.getController(req, resp);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});
