# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}

---

**Congratulations on your new mo-node project!**

You are almost ready to run this barebones application, so let's make it happen.

* Install heroku toolbelt https://toolbelt.heroku.com/
* Install [node version manager (nvm)](https://github.com/creationix/nvm)
* Run `nvm install` to get the required version of node
* Run `nvm use` to start using the required version of node
* Run `npm install` to install the default project dependencies
* If you choose to have views, run `npm run build` to build front end assets

If you choose the database option
* Run `createdatabase {{cookiecutter.package_name}}` to create the database
* Run `createuser {{cookiecutter.package_name}}` to create the database user
* Edit .env to set a valid DATABASE_URL

* Start your app in dev (watch) mode by running `heroku local -f Procfile.dev`
* Visit [http://localhost:3008](http://localhost:3008) and you should see an inspiring message, which indicates that your app is running.

**Finally, take this whole section out of README and write one specific to your project. Be a good citizen.**

---
