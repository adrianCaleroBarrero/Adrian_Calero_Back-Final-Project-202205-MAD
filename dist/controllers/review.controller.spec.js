import { Review } from '../models/review.model';
import { ReviewController } from './review.controller';
jest.mock('../models/review.model');
describe('Given the user controller', () => {
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
    describe('When use getAllController', () => {
        test('Then should send a response', async () => {
            Review.find = jest.fn().mockReturnValue({
                populate: jest
                    .fn()
                    .mockReturnValue({
                    populate: jest.fn().mockReturnValue({}),
                }),
            });
            await controller.getAllController(req, resp);
            expect(Review.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
});
