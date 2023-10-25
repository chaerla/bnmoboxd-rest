import { config } from 'dotenv';

config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { ENV, PORT, SECRET_KEY, DATABASE_URL, ORIGIN } = process.env;
