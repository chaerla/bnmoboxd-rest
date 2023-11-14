import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PASSWORD } from '@config';

const redis = new Redis({
  host: REDIS_HOST,
  port: 6379,
  password: REDIS_PASSWORD,
});
export default redis;
