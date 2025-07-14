import { createClient } from 'redis';

const redisUrl = process.env.HOST_REDIS;

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.on('end', () => {
  console.log('Redis client connection closed');
});

if (!redisClient.isOpen) { // Does not trigger for regression
  await redisClient.connect();
}

export default redisClient;
