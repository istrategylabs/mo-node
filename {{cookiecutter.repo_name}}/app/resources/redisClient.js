
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
  return new P((resolve, reject) => {
    if (instance) {
      instance.quit();
    }
    instance = redis.createClient(process.env.REDIS_URL);
    process.nextTick(() => resolve(exports));
  });
};

/**
 * Returns the existing redis client.
 *
 * @return {Object} Redis cient instance
 */
exports.getInstance = () => {
  if (!instance) {
    throw Error('The redis resource has not yet been initialized');
  } else {
    return instance;
  }
};

/**
 * Destroys the redis client
 *
 * @return {Promsie}
 */
exports.cleanup = () => {
  log.info('Cleaning up redis client');
  return new P((resolve, reject) => {
    if (instance) {
      instance.quit();
      instance = null;
    }
    process.nextTick(() => resolve());
  });
};
