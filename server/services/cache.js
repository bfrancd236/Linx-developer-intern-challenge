const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/redis');

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

client.on('error', function(err) {});
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    }),
  );
  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
  addToCache(hashKey, key, result) {
    client.hset(hashKey, key, JSON.stringify(result));
  },
  clearField(hashKey) {
    client.del(hashKey);
  },
  async getFromCache(hashKey, key) {
    const cacheValue = await client.hget(hashKey, key);
    if (cacheValue) {
      const result = JSON.parse(cacheValue);
      return result;
    }
    return null;
  },
};
