import { promisify } from "util";
import redis from "redis";

const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on("error", (error) => {
    console.error(error);
});

export const set = promisify(client.set).bind(client);
export const get = promisify(client.get).bind(client);
export const pushList = promisify(client.rpush).bind(client);
export const getList = promisify(client.lrange).bind(client);
export const remove = promisify(client.del).bind(client);
