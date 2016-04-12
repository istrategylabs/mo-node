
'use strict'

{% if cookiecutter.use_express == 'y' -%}
import path from 'path'
import express from 'express'
import session from 'express-session'
import routes from './routes'
import bodyParser from 'body-parser'
{% if cookiecutter.render_views == 'y' -%}
import nunjucks from 'nunjucks'
{%- endif %}
import * as resources from './resources'
import Logger from './log'
const app = express()
const log = Logger()

{% if cookiecutter.render_views == 'y' -%}
nunjucks.configure('views', {
  autoescape: true,
  express: app
})
{%- endif %}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
{% if cookiecutter.render_views == 'y' -%}
app.set('view engine', 'html')
app.set('view cache', false)
app.set('renderer', nunjucks.render)
app.engine('html', nunjucks.render)
app.use(express.static(path.join(__dirname, '../public')))

const opts = {
  noCache: true
}

const searchPaths = [path.join(__dirname, 'templates/')]
const loader = new nunjucks.FileSystemLoader(searchPaths, opts)
const env = new nunjucks.Environment(loader)

env.express(app)
{%- endif %}

app.set('secret', process.env.SECRET)

let hosts = process.env.ALLOWED_HOSTS || `http://localhost:${process.env.PORT}`
hosts = hosts
  .split(',')
  .map((host) => host.trim())

if (hosts.length === 0) {
  hosts.push(`localhost:${process.env.PORT}`)
}

log.info(`Allowed hosts: ${hosts}`)

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', hosts)
  next()
}

app.use(allowCrossDomain)

resources.init()
  .then(() => {
    log.info('Resources setup')
    routes(express, app)
    listen()
  })

function listen() {
  const server = app.listen(process.env.PORT, () => {
    const host = server.address().address
    const port = server.address().port
    log.info('\n')
    log.info('------------------------------------------------------------')
    log.info(`{{ cookiecutter.package_name }} is listening.`)
    log.info('------------------------------------------------------------')
  });
}
{%- else %}
import Logger from './log'
import resources from './resources'
const log = Logger()

resources.init()
  .then(() => {
    log.info('Resources setup')
    log.info('\n     I believe in you!\n')
  })
{%- endif %}

