/* eslint-disable new-cap */
import mongoose from 'mongoose';
import redis from 'redis';
import { promisify } from 'util';

const fnExec = mongoose.Query.prototype.exec;

const client = redis.createClient('redis://127.0.0.1:6379');
client.hgetPromise = promisify(client.hget);

mongoose.Query.prototype.cache = function setCache({ key } = { key: 'tmp' }) {
  this.useCache = true;
  this.hashKey = JSON.stringify(key);
  return this;
};

mongoose.Query.prototype.exec = async function cachedExec(...args) {
  if (!this.useCache) return fnExec.apply(this, args);

  const key = JSON.stringify({ ...this.getQuery(), collection: this.mongooseCollection.name });
  const cacheValue = await client.hgetPromise(this.hashKey, key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await fnExec.apply(this, args);
  client.hset(this.hashKey, key, JSON.stringify(result));

  return result;
};
