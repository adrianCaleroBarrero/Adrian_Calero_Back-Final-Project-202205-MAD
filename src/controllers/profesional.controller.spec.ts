import { Request, Response } from 'express';
import { iProfesional, Profesional } from '../models/profesional.model';
import { ProfesionalController } from './profesional.controller';

jest.mock('../models/profesional.model');

describe('Given the user controller', () => {
    let controller: ProfesionalController<iProfesional>;
    let req: Partial<Request>;
    let resp: Partial<Response>;

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

        controller = new ProfesionalController(Profesional) as any;
    });
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            Profesional.find = jest.fn().mockReturnValue({});

            await controller.getAllController(req as Request, resp as Response);
            expect(Profesional.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    describe('When use getController', () => {
        test('Then should send a response', async () => {
            Profesional.findById = jest.fn().mockReturnValue({});

            await controller.getController(req as Request, resp as Response);
            expect(Profesional.findById).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then should send a status 404', async () => {
            Profesional.findById = jest.fn().mockReturnValue(undefined);

            await controller.getController(req as Request, resp as Response);

            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});
