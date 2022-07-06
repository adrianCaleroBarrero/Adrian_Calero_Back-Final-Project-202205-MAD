import { NextFunction, Request, Response } from 'express';
import { iProfesional, Profesional } from '../models/profesional.model';
import { ProfesionalController } from './profesional.controller';

jest.mock('../models/profesional.model');

describe('Given the user controller', () => {
    process.env.URL_MONGO_TEST = '';
    console.log('Process env url test', process.env.URL_MONGO_TEST);

    let controller: ProfesionalController<iProfesional>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;

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
        next = jest.fn();

        controller = new ProfesionalController(Profesional) as any;
    });
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            Profesional.find = jest.fn().mockReturnValue({});

            await controller.getAllController(req as Request, resp as Response);
            expect(Profesional.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith({});
        });
    });

    describe('When use getController', () => {
        test('Then should send a response', async () => {
            Profesional.findById = jest.fn().mockReturnValue({});

            await controller.getController(
                req as Request,
                resp as Response,
                next
            );
            expect(Profesional.findById).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then should be call a next function', async () => {
            Profesional.findById = jest.fn().mockReturnValue(undefined);

            await controller.getController(
                req as Request,
                resp as Response,
                next
            );

            expect(next).toHaveBeenCalled();
        });
        test('Then should be catch a error', async () => {
            Profesional.findById = jest.fn().mockRejectedValue({});

            await controller.getController(
                req as Request,
                resp as Response,
                next
            );

            expect(next).toHaveBeenCalled();
        });
    });

    describe('When use postController', () => {
        test('Then should send a response', async () => {
            Profesional.create = jest.fn().mockReturnValue({});

            await controller.postController(
                req as Request,
                resp as Response,
                next
            );
            expect(Profesional.create).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then should be catch a error', async () => {
            Profesional.create = jest.fn().mockRejectedValue({});

            await controller.postController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
