# mo-node

A [cookiecutter](https://github.com/audreyr/cookiecutter) template for ISL Node projects.

## Features

* [ES2015](http://www.ecma-international.org/ecma-262/6.0/index.html) transpiling
* [bunyan](https://github.com/trentm/node-bunyan)
* [nodemon](https://github.com/remy/nodemon)
* [Gulp](http://gulpjs.com/)
* [Sass](https://github.com/dlmanning/gulp-sass) (with [Autoprefixer](https://autoprefixer.github.io/))
* [Browserify](http://browserify.org/)
* [BrowserSync](http://www.browsersync.io/)
* [cssnano](http://cssnano.co) for CSS and [uglify](https://www.npmjs.com/package/uglify) for JavaScript
* [nunjucks](https://mozilla.github.io/nunjucks/)
* [foundation for sites](https://github.com/zurb/foundation-sites)
* Asset manifest for asset cache busting

## Default Packages

* [bunyan](https://github.com/trentm/node-bunyan)
* [cuid](https://github.com/ericelliott/cuid)
* [tape](https://github.com/substack/tape)
* [nodemon](https://github.com/remy/nodemon)

## Optional Packages

* [postgres](https://github.com/brianc/node-postgres)
* [redis](https://github.com/NodeRedis/node_redis)
* [express](http://expressjs.com/)
  
### Node Version
mo-node will always track the latest [Node LTS](https://github.com/nodejs/LTS) 

## Starting a new project

First, make sure you have [cookiecutter](https://github.com/audreyr/cookiecutter) installed. If you are using OS X, [Homebrew](http://brew.sh) can take care of that for you:

  brew install cookiecutter

Cookiecutter templates can be installed directly from GitHub. Navigate to the directory where you want your project to be created and run:

    cookiecutter gh:istrategylabs/mo-node

Answer the questions as you are prompted. Write beautiful code.
