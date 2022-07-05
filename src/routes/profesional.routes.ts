import { Router } from 'express';
import { ProfesionalController } from '../controllers/profesional.controller.js';
import { Profesional } from '../models/profesional.model.js';

export const profesionalController = new ProfesionalController(Profesional);
export const profesionalRoutes = Router();

profesionalRoutes.get('/', profesionalController.getAllController);
profesionalRoutes.get('/:id', profesionalController.getController);
