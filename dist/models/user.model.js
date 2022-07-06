import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const userSchema = new mongoose.Schema({
    avatar: mongoose.SchemaTypes.String,
    userName: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    passwd: { type: mongoose.SchemaTypes.String, required: true },
    favorites: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Profesional',
        },
    ],
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});
export const User = mongoose.model('User', userSchema);
