import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { Review } from '../models/review.model.js';

export const reviewController = new ReviewController(Review);
export const reviewRoutes = Router();

reviewRoutes.get('/', reviewController.getAllInProfesionalController);
reviewRoutes.post('/', reviewController.postController);
reviewRoutes.patch('/:id', reviewController.patchController);
reviewRoutes.delete('/:id', reviewController.deleteController);
