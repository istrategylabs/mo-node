
'use strict';

const bunyan = require('bunyan');
let instance;

module.exports = () => {
  if (!instance) {
    instance = bunyan.createLogger({ name: '{{cookiecutter.package_name}}' });
  }
  return instance;
};
