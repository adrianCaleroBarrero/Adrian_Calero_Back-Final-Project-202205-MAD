import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { loginRequired } from '../middleware/login-required.js';
import { userRequired } from '../middleware/user-required.js';
import { Review } from '../models/review.model.js';

export const reviewController = new ReviewController(Review);
export const reviewRoutes = Router();

reviewRoutes.get(
    '/:workerId',
    loginRequired,
    reviewController.getAllInProfesionalController
);
reviewRoutes.post('/', loginRequired, reviewController.postController);
reviewRoutes.patch(
    '/:id',
    loginRequired,
    userRequired,
    reviewController.patchController
);
reviewRoutes.delete(
    '/:id',
    loginRequired,
    userRequired,
    reviewController.deleteController
);
