import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const userSchema = new mongoose.Schema({
    avatar: String,
    userName: { type: String, require: true },
    email: { type: String, require: true },
    passwd: { type: String, require: true },
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
