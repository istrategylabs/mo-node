
'use strict'

import P from 'bluebird'
import Knex from 'knex'
import Logger from '../log'
const log = Logger()
let instance

/**
 * Initializes the knex client. If the client has already been initialized,
 * the existing client will be destroyed and a new client will be created.
 *
 * @return {Promise} Resolves the current module
 */
export function init() {
  log.debug('Initializing the database resource')
  return new P((resolve) => {
    if (instance) {
      instance.destroy(() => {
        instance = doInit()
        resolve(exports)
      })
    } else {
      instance = doInit()
      process.nextTick(() => resolve(exports))
    }
  })

  function doInit() {
    return Knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
      pool: {
        min: 0,
        max: process.env.DB_POOL || 10
      }
    })
  }
}

/**
 * Returns the existing knex client.
 *
 * @return {Object} knex cient instance
 */
export function getInstance() {
  if (!instance) {
    throw Error('The database resource has not been initialized')
  } else {
    return instance
  }
}

/**
 * Destroys the redis client
 *
 * @return {Promsie}
 */
export function cleanup() {
  log.info('Cleaning up database client')
  return new P((resolve) => {
    if (instance) {
      instance.destroy(() => {
        instance = null
        resolve()
      })
    } else {
      process.nextTick(() => resolve())
    }
  })
}
