import * as mongoose from 'mongoose';

mongoose.Query.prototype.cache = function setCache({ key } = { key: 'tmp' }) {
  this.useCache = true;
  this.hashKey = JSON.stringify(key);
  return this;
};
