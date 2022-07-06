import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { iReview, Review } from '../models/review.model';
import { ReviewController } from './review.controller';

jest.mock('../models/review.model');

describe('Given the review controller', () => {
    let controller: ReviewController<iReview>;
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

        controller = new ReviewController(Review) as any;
    });
    describe('When use getAllInProfesionalController', () => {
        test('Then should send a response', async () => {
            Review.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockReturnValue({}),
                }),
            });

            await controller.getAllInProfesionalController(
                req as Request,
                resp as Response
            );
            expect(Review.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    describe('When use postController', () => {
        test('Then should send a response', async () => {
            Review.create = jest.fn().mockReturnValue({});

            await controller.postController(
                req as Request,
                resp as Response,
                next
            );
            expect(Review.create).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(201);
        });
        test('Then should be catch a error', async () => {
            Review.create = jest.fn().mockRejectedValue({});

            await controller.postController(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When use patchController', () => {
        test('Then send a response', async () => {
            Review.findByIdAndUpdate = jest.fn().mockReturnValue({});

            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );

            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then catch a error', async () => {
            Review.findByIdAndUpdate = jest.fn().mockRejectedValue({});

            await controller.patchController(
                req as Request,
                resp as Response,
                next
            );

            expect(next).toHaveBeenCalled();
        });
    });

    describe('When use deleteController', () => {
        test('Then send a response', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue({});
            Review.findByIdAndDelete = jest.fn().mockReturnValue({});

            await controller.deleteController(
                req as Request,
                resp as Response,
                next
            );

            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then catch a error', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue({});
            Review.findByIdAndDelete = jest.fn().mockRejectedValue({});

            await controller.deleteController(
                req as Request,
                resp as Response,
                next
            );

            expect(next).toHaveBeenCalled();
        });
    });
});
