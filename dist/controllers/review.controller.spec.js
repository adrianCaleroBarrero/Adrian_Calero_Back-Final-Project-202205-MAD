import mongoose from 'mongoose';
import { Review } from '../models/review.model';
import { ReviewController } from './review.controller';
jest.mock('../models/review.model');
describe('Given the review controller', () => {
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
        controller = new ReviewController(Review);
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
            await controller.postController(req, resp);
            expect(Review.create).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(201);
        });
    });
    describe('When use patchController', () => {
        test('Then send a response', async () => {
            Review.findByIdAndUpdate = jest.fn().mockReturnValue({});
            await controller.patchController(req, resp);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
    describe('When use deleteController', () => {
        test('Then send a response', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue({});
            Review.findByIdAndDelete = jest.fn().mockReturnValue({});
            await controller.deleteController(req, resp);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
});
