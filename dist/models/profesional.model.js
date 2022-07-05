import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const profesionalSchema = new mongoose.Schema({
    avatar: mongoose.SchemaTypes.String,
    name: { type: mongoose.SchemaTypes.String, required: true },
    profesion: { type: mongoose.SchemaTypes.String, required: true },
    info: {
        description: mongoose.SchemaTypes.String,
        price: mongoose.SchemaTypes.Number,
        img: mongoose.SchemaTypes.String,
        video: mongoose.SchemaTypes.String,
    },
});
profesionalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
export const Profesional = mongoose.model('Profesional', profesionalSchema);
