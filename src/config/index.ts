import { config } from 'dotenv';

config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  ENV,
  PORT,
  SECRET_KEY,
  DATABASE_URL,
  ORIGIN,
  PHP_BASE_URL,
  SOAP_BASE_URL,
  PHP_API_KEY,
  SOAP_API_KEY,
  REST_API_KEY,
  REDIS_HOST,
  REDIS_PASSWORD,
} = process.env;
