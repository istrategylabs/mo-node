
'use strict'

import bunyan from 'bunyan'
let instance

export default () => {
  if (!instance) {
    instance = bunyan.createLogger({
      name: '{{cookiecutter.package_name}}',
      level: (process.env.NODE_ENV === 'production') ? 'INFO': 'DEBUG'
    })
  }
  return instance
};
