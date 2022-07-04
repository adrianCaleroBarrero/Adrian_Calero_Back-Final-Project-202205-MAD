import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
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
