
'use strict';

const P = require('bluebird');
const redis = require('redis');
const log = require('../log')();
let instance;

/**
 * Initializes the redis client. If the client has already been initialized,
 * the existing client will be destroyed and a new client will be created.
 *
 * @return {Promise} Resolves the current module
 */
exports.init = () => {
  log.debug('Initializing the redis resource');
  const resolver = P.pending();
  if (instance) {
    instance.quit();
  }
  instance = redis.createClient(process.env.REDIS_URL);
  process.nextTick(() => resolver.resolve(exports));
  return resolver.promise;
};

/**
 * Returns the existing redis client. If it does not exist, it will be created
 *
 * @return {Promise} Resolves a redis client instance
 */
exports.instance = () => {
  const resolver = P.pending();
  if (!instance) {
    instance = redis.createClient(process.env.REDIS_URL);
  }
  process.nextTick(() => resolver.resolve(instance));
  return resolver.promise;
};

/**
 * Destroys the redis client
 *
 * @return {Promsie}
 */
exports.cleanup = () => {
  log.info('Cleaning up redis client');ß
  const resolver = P.pending();
  if (instance) {
    instance.quit();
    instance = null;
  }
  process.nextTick(() => resolver.resolve());
  return resolver.promise;
};
