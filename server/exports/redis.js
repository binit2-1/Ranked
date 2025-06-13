import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = new Redis(
    {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        username: process.env.REDIS_USERNAME || undefined,
        db: process.env.REDIS_DB || 0,
        retryStrategy: (times) => {
            // Exponential backoff for reconnection
            return Math.min(times * 50, 2000);
        },
    }
);

export default redisClient;

