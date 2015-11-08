
'use strict';

{% if cookiecutter.use_express == 'y' -%}
const express = require( 'express' );
const app     = express();

app.get('/', ( req, res ) => {
  res.send( 'I believe in you!' );
});

const server  = app.listen(3000, () => {
  const host    = server.address().address;
  const port    = server.address().port;
  console.log( 'App listening at http://%s:%s', host, port );
});
{%- else %}
console.log( '\n     I believe in you!\n' );
{%- endif %}
