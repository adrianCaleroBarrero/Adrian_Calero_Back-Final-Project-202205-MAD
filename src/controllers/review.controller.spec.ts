import { Request, Response } from 'express';
import { iReview, Review } from '../models/review.model';
import { ReviewController } from './review.controller';

jest.mock('../models/review.model');

describe('Given the user controller', () => {
    let controller: ReviewController<iReview>;
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

        controller = new ReviewController(Review) as any;
    });
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            Review.find = jest.fn().mockReturnValue({
                populate: jest
                    .fn()
                    .mockReturnValue({
                        populate: jest.fn().mockReturnValue({}),
                    }),
            });

            await controller.getAllController(req as Request, resp as Response);
            expect(Review.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
});
