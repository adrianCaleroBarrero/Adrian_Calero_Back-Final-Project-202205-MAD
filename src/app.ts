import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRoutes } from './routes/user.routes.js';
import { profesionalRoutes } from './routes/profesional.routes.js';
import { reviewRoutes } from './routes/review.routes.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/users', userRoutes);
app.use('/profesional', profesionalRoutes);
app.use('/profesionals', profesionalRoutes);
app.use('/review', reviewRoutes);
app.use('/reviews', reviewRoutes);
