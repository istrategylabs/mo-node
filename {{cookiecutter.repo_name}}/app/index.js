
'use strict';

const cuid = require('cuid');
{% if cookiecutter.use_express == 'y' -%}
const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const bodyParser = require('body-parser');
{% if cookiecutter.render_views == 'y' -%}
const nunjucks = require('nunjucks');
{%- endif %}
const app = express();
const log = require('./log')();

{% if cookiecutter.render_views == 'y' -%}
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
{%- endif %}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
{% if cookiecutter.render_views == 'y' -%}
app.set('view engine', 'html');
app.set('view cache', false);
{%- endif %}

app.set('secret', process.env.SECRET);

let hosts = process.env.ALLOWED_HOSTS || `http://localhost:${process.env.PORT}`;
hosts = hosts
  .split(',')
  .map((host) => host.trim());

if (hosts.length === 0) {
  hosts.push(`localhost:${process.env.PORT}`);
}

log.info(`Allowed hosts: ${hosts}`);

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', hosts);
  next();
};

app.use(allowCrossDomain);

routes(express, app);

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
{%- else %}
const log = require('./log')();
log.info('\n     I believe in you!\n');
{%- endif %}

