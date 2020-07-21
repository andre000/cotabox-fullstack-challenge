import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient('redis://127.0.0.1:6379');
client.hgetPromise = promisify(client.hget);

export default {
  clearHash(hash = 'tmp'): void {
    client.del(JSON.stringify(hash));
  },
};
