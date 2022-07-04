import { ReturnDocument } from 'mongodb';
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

(async () => {
    await mongooseConnect();
})();

export interface iProfesional {
    id?: string;
    avatar: string;
    name: string;
    profesion: string;
    info: {
        description: string;
        price: number;
        img: string;
        video: string;
    };
}

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
    transform: (document, ReturnedObject) => delete ReturnedObject.__v,
});

export const Profesional = mongoose.model('Profesional', profesionalSchema);
