import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const userSchema = new mongoose.Schema({
    avatar: String,
    userName: { type: String, required: true },
    email: { type: String, required: true },
    passwd: { type: String, required: true },
    favorites: [
        {
            type: ObjectId,
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
