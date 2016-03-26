
'use strict';

const P = require('bluebird');
{% if cookiecutter.use_redis == 'y' -%}
const redisClient = require('./redisClient');
{%- endif %}

/*
* Each resource in this directory is treated as a singleton and
* must implement and export 3 functions
*
* 1) init()
* Initializes the underlying resource client and resolves the resource module
*
* 2) instnace()
* Returns the current client via a promise resolution
*
* 3) cleanup()
* Cleans up a resource's connections etc
*
* */


exports.init = () => {
  const resolver = P.pending();
  P.map([
    {% if cookiecutter.use_redis == 'y' -%}
    redisClient
    {%- endif %}
  ], (resource) => resource.init())

  .then((resources) => {
    process
      .on('SIGTERM', () => {
        P.each(resources, (r) => r.cleanup())
      })
      .on('SIGINT', () => {
        P.each(resources, (r) => r.cleanup())
      })
    resolver.resolve();
  });
  return resolver.promise;
};


