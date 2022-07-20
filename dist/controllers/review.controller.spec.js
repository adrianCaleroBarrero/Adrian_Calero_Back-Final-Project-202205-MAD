import mongoose from 'mongoose';
import { Review } from '../models/review.model';
import { ReviewController } from './review.controller';
jest.mock('../models/review.model');
describe('Given the review controller', () => {
    let controller;
    let req;
    let resp;
    let next;
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
        controller = new ReviewController(Review);
    });
    afterEach(async () => {
        await mongoose.connection.close();
    });
    describe('When use getAllInProfesionalController', () => {
        test('Then should send a response', async () => {
            Review.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockReturnValue({}),
                }),
            });
            await controller.getAllInProfesionalController(req, resp);
            expect(Review.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
    describe('When use postController', () => {
        test('Then should send a response', async () => {
            Review.create = jest.fn().mockReturnValue({});
            await controller.postController(req, resp, next);
            expect(Review.create).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(201);
        });
        test('Then should be catch a error', async () => {
            Review.create = jest.fn().mockRejectedValue({});
            await controller.postController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use patchController', () => {
        test('Then send a response', async () => {
            Review.findByIdAndUpdate = jest.fn().mockReturnValue({});
            await controller.patchController(req, resp, next);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then catch a error', async () => {
            Review.findByIdAndUpdate = jest.fn().mockRejectedValue({});
            await controller.patchController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use deleteController', () => {
        test('Then send a response', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue({});
            Review.findByIdAndDelete = jest.fn().mockReturnValue({});
            await controller.deleteController(req, resp, next);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then catch a error', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue({});
            Review.findByIdAndDelete = jest.fn().mockRejectedValue({});
            await controller.deleteController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
