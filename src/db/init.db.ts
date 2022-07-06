import { iUser, User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { mongooseConnect } from './mongoose.js';
import { iReview, Review } from '../models/review.model.js';
import { iProfesional, Profesional } from '../models/profesional.model.js';

let aUsers: Array<iUser> = [
    {
        avatar: 'url',
        userName: 'Pepe',
        email: 'pepe@sample.com',
        passwd: '1234',
        favorites: [],
    },
    {
        avatar: 'url',
        userName: 'Luisa',
        email: 'luisa@acme.com',
        passwd: '1234',
        favorites: [],
    },
];

const aReviews: Array<iReview> = [
    {
        worker: null,
        client: null,
        date: '10-02-1995',
        reviews: {
            img: [],
            video: [],
            comment: 'testing',
            score: 1,
        },
    },
    {
        worker: null,
        client: null,
        date: '10-02-2008',
        reviews: {
            img: [],
            video: [],
            comment: 'testing 2',
            score: 2,
        },
    },
];

const aProfesionals: Array<iProfesional> = [
    {
        avatar: 'url',
        name: 'jesus',
        profesion: 'Mechanic',
        info: {
            description: 'testing',
            price: 5,
            img: 'url',
            video: 'url',
        },
    },
    {
        avatar: 'url',
        name: 'toño',
        profesion: 'architect',
        info: {
            description: 'testing',
            price: 10,
            img: 'url',
            video: 'url',
        },
    },
];

export const initDB = async () => {
    const connect = await mongooseConnect();
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            passwd: await bcrypt.hash(item.passwd, 10),
        }))
    );
    const users = await User.insertMany(aUsers);
    const profesionals = await Profesional.insertMany(aProfesionals);
    aReviews[0].client = users[0].id;
    aReviews[1].client = users[1].id;
    aReviews[0].worker = profesionals[0].id;
    aReviews[1].worker = profesionals[1].id;

    const reviews = await Review.insertMany(aReviews);

    let finalUsers = [];
    for (let i = 0; i < users.length; i++) {
        const item = users[i];
        finalUsers[i] = await User.findByIdAndUpdate(
            item.id,
            {
                $set: { client: [reviews[i].id] },
            },
            { new: true }
        );
    }

    let finalProfesionals = [];
    for (let i = 0; i < profesionals.length; i++) {
        const item = profesionals[i];
        finalProfesionals[i] = await Profesional.findByIdAndUpdate(
            item.id,
            {
                $set: { worker: [reviews[i].id] },
            },
            { new: true }
        );
    }

    connect.disconnect();
    return {
        reviews,
        users: finalUsers,
        profesionals: finalProfesionals,
    };
};
