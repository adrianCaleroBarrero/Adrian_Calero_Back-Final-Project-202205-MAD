import { Request, Response, NextFunction } from 'express';
import { iUser, User } from '../models/user.model';
import { UserController } from './user.controller';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Given the user controller', () => {
    let controller: UserController<iUser>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
            body: {},
        };

        resp = {
            setHeader: jest.fn(),
            send: jest.fn(),
            status: jest.fn(),
            json: jest.fn(),
        };

        next = jest.fn();
        controller = new UserController(User) as any;
    });
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            User.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ favorites: 'test' }),
            });

            await controller.getAllController(req as Request, resp as Response);
            expect(User.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ favorites: 'test' })
            );
        });
    });

    describe('When use getController', () => {
        test('Then should send a response', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ favorites: 'test' }),
            });

            await controller.getController(req as Request, resp as Response);
            expect(User.findById).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ favorites: 'test' })
            );
        });
        test('Then should send a status 404', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(undefined),
            });

            await controller.getController(req as Request, resp as Response);

            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });

    describe('When use postController', () => {
        test('Then should send a response and status 201', async () => {
            User.create = jest.fn().mockReturnValue({});

            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(User.create).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
            expect(resp.status).toHaveBeenCalledWith(201);
        });
        test('Then should send a error', async () => {
            User.create = jest.fn().mockReturnValue(undefined);

            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When use loginController', () => {
        test('Then should send a response and status 202', async () => {
            User.findOne = jest.fn().mockReturnValue({});
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue({});

            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(User.findOne).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(202);
        });
        test('Then should send a response and status 202', async () => {
            User.findOne = jest.fn().mockReturnValue({});
            bcrypt.compare = jest.fn().mockResolvedValue(false);
            jwt.sign = jest.fn().mockReturnValue({});

            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use patchController', () => {
        test('Then should send a response', async () => {
            User.findByIdAndUpdate = jest.fn().mockReturnValue({});

            await controller.patchController(req as Request, resp as Response);
            expect(User.findByIdAndUpdate).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    describe('When use deleteController', () => {
        test('Then should send a response', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(1);
            User.findByIdAndDelete = jest.fn().mockReturnValue({});

            await controller.deleteController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then should send a status 404', async () => {
            mongoose.Types.ObjectId.isValid = jest
                .fn()
                .mockReturnValue(undefined);
            resp.status = jest.fn().mockReturnValue({ json: jest.fn() });

            await controller.deleteController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});
