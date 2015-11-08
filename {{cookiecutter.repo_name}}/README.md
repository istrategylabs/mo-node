# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}

---

**Congratulations on your new mo-node project!**

You are almost ready to run this barebones application, so let's make it happen.

* Copy *env.example* to *.env*
* Edit *.env* to set a valid DATABASE_URL


* Run `npm install` to install the default project dependencies
* Run `createdatabase {{cookiecutter.package_name}}_local` to create the database
* Run `createuser {{cookiecutter.package_name}}_local` to create the database user
* Start your app by running `foreman start`
* Visit [http://localhost:3000](http://localhost:3000) and you should see a beautiful Django error page, which indicates that your app is running and that you haven't built anything yet.

**Finally, take this whole section out of README and write one specific to your project. Be a good citizen.**

---
