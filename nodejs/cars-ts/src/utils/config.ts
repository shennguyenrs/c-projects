import dotenv from 'dotenv';

// Environment variables
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const SERECT_KEY = process.env.SERECT_KEY;
