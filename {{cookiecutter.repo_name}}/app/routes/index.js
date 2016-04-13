'use strict'

export default function(express, app) {

  const mainRouter = express.Router()

  mainRouter

    .get('/', (req, res) => {
      {% if cookiecutter.render_views == 'n' -%}
      res.send({ message: 'hello, world' })
      {%- endif %}
      {% if cookiecutter.render_views == 'y' -%}
      res.render('index.html')
      {%- endif %}
    })

  app.use('/', mainRouter)

}
