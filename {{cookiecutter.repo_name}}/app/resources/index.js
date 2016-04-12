
'use strict'

import P from 'bluebird'
{% if cookiecutter.use_redis == 'y' -%}
import * as redisClient from './redisClient'
{%- endif %}

/*
* Each resource in this directory is treated as a singleton and
* must implement and export 3 functions
*
* 1) init()
* Initializes the underlying resource client and resolves the resource module
*
* 2) getInstnace()
* Returns the current client
*
* 3) cleanup()
* Cleans up a resource's connections etc
*
* */


export function init() {
  return new P((resolve) => {
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
      resolve()
    })
  })
}


