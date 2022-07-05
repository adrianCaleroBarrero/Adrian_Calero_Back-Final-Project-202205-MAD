import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

export const encrypt = async (source: string, salt = 10) => {
    return await bcrypt.hash(source, salt); // encrytar
};

export const compare = async (value: string, hash: string) => {
    return await bcrypt.compare(value, hash);
};
