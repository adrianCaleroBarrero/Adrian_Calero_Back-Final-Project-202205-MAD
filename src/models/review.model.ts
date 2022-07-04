import mongoose from 'mongoose';
import { mongooseConnect, Relation } from '../db/mongoose.js';

(async () => {
    await mongooseConnect();
})();

export interface iReview {
    worker: Relation;
    client: Relation;
    date: string;
    reviews: {
        img: string[];
        video: string[];
        comment: string;
        score: number;
    };
}

const reviewSchema = new mongoose.Schema({
    worker: { type: mongoose.SchemaTypes.ObjectId, ref: 'Profesional' },
    client: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    date: mongoose.SchemaTypes.String,
    reviews: {
        img: { type: [mongoose.SchemaTypes.String] },
        video: { type: [mongoose.SchemaTypes.String] },
        comment: mongoose.SchemaTypes.String,
        score: mongoose.SchemaTypes.Number,
    },
});

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => delete returnedObject.__v,
});
export const Review = mongoose.model('Review', reviewSchema);
