import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const profesionalSchema = new mongoose.Schema({
    avatar: String,
    name: { type: String, required: true },
    profesion: { type: String, required: true },
    info: {
        description: String,
        price: Number,
        img: String,
        video: String,
    },
});
profesionalSchema.set('toJSON', {
    transform: (document, returnedObject) => delete returnedObject.__v,
});
export const Profesional = mongoose.model('Profesional', profesionalSchema);
