import { User } from '../models/user.model';
import { UserController } from './user.controller';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
describe('Given the user controller', () => {
    let controller;
    let req;
    let resp;
    let next;
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
        controller = new UserController(User);
    });
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            User.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ favorites: 'test' }),
            });
            await controller.getAllController(req, resp);
            expect(User.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({ favorites: 'test' }));
        });
    });
    describe('When use getController', () => {
        test('Then should send a response', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ favorites: 'test' }),
            });
            await controller.getController(req, resp);
            expect(User.findById).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({ favorites: 'test' }));
        });
        test('Then should send a status 404', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(undefined),
            });
            await controller.getController(req, resp);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
    describe('When use postController', () => {
        test('Then should send a response and status 201', async () => {
            User.create = jest.fn().mockReturnValue({});
            await controller.postController(req, resp, next);
            expect(User.create).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
            expect(resp.status).toHaveBeenCalledWith(201);
        });
        test('Then should send a error', async () => {
            User.create = jest.fn().mockReturnValue(undefined);
            await controller.postController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use loginController', () => {
        test('Then should send a response and status 202', async () => {
            User.findOne = jest.fn().mockReturnValue({});
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue({});
            await controller.loginController(req, resp, next);
            expect(User.findOne).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(202);
        });
        test('Then should send a response and status 202', async () => {
            User.findOne = jest.fn().mockReturnValue({});
            bcrypt.compare = jest.fn().mockResolvedValue(false);
            jwt.sign = jest.fn().mockReturnValue({});
            await controller.loginController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use patchController', () => {
        test('Then should send a response', async () => {
            User.findByIdAndUpdate = jest.fn().mockReturnValue({});
            await controller.patchController(req, resp);
            expect(User.findByIdAndUpdate).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
    describe('When use deleteController', () => {
        test('Then should send a response', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(1);
            User.findByIdAndDelete = jest.fn().mockReturnValue({});
            await controller.deleteController(req, resp);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then should send a status 404', async () => {
            mongoose.Types.ObjectId.isValid = jest
                .fn()
                .mockReturnValue(undefined);
            resp.status = jest.fn().mockReturnValue({ json: jest.fn() });
            await controller.deleteController(req, resp);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});