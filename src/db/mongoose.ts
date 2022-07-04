import mongoose from 'mongoose';

export async function mongooseConnect() {
    const url =
        process.env.NODE_ENV?.toLowerCase() === 'test'
            ? 'mongodb+srv://adrian:adry753951@cluster0.zpmccni.mongodb.net/robot-test?retryWrites=true&w=majority'
            : 'mongodb+srv://adrian:adry753951@cluster0.zpmccni.mongodb.net/?retryWrites=true&w=majority';
    console.log({ url });

    return mongoose.connect(url as string);
}

export interface Relation {
    type: mongoose.Types.ObjectId;
    ref: string;
}
