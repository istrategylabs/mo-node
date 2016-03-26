
'use strict';

const bunyan = require('bunyan');
let instance;

module.exports = () => {
  if (!instance) {
    instance = bunyan.createLogger({
      name: '{{cookiecutter.package_name}}',
      level: (process.env.NODE_ENV === 'production') ? 'INFO': 'DEBUG'
    });
  }
  return instance;
};
