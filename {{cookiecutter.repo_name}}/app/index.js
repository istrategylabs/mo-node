
'use strict';

{% if cookiecutter.use_express == 'y' -%}
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.set('view cache', false);
app.set('secret', process.env.SECRET);

app.get('/', (req, res) => {
  res.send('I believe in you!');
});

const server  = app.listen(3000, () => {
  const host    = server.address().address;
  const port    = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
{%- else %}
console.log('\n     I believe in you!\n');
{%- endif %}
