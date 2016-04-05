
import subprocess
import shutil
import os

need_npm_token = False

{% if cookiecutter.use_express == 'n' -%}
shutil.rmtree("app/routes")
{%- endif %}

{% if cookiecutter.render_views == 'n' -%}
shutil.rmtree("src/")
os.remove("gulpfile.js")
os.remove("banner.txt")
{%- endif %}

{% if cookiecutter.use_redis == 'n' -%}
os.remove("app/resources/redisClient.js")
{%- endif %}

{% if cookiecutter.use_postgres == 'n' -%}
os.remove("app/resources/dbClient.js")
{%- endif %}

{% if cookiecutter.use_npm_token == 'y' -%}
npm_token = os.environ.get("NPM_TOKEN")
need_npm_token = True
# npm won't allow you to perform an npm install if you're using .npmrc and the
# NPM_TOKEN isn't actually set. The value set here will not persist. You will
# need to actually set the NPM_TOKEN environment variable before attempting to
# install a private npm module.
if npm_token is None:
    os.putenv('NPM_TOKEN','omg_change_immediately')
    print "\n   *****************************************************************"
    print "   Oh, hai!"
    print "   I see you've chosen to setup your .npmrc file - good for you."
    print "   You don't seem to have 'NPM_TOKEN' set in your environment."
    print "   You'll absolutely need to set that to a valid token in order to"
    print "   install a private npm module."
    print "   Read more about .npmrc at https://docs.npmjs.com/files/npmrc"
    print "   *****************************************************************\n"


{% raw %}
with open(".npmrc", "w") as text_file:
    text_file.write("//registry.npmjs.org/:_authToken=${{{0}}}".format("NPM_TOKEN"))
{% endraw %}
{%- endif %}
subprocess.call(["cp", "env.example", ".env"])

print "\n   ************************* Almost done! **************************"
print "   1) Install heroku toolbelt https://toolbelt.heroku.com/"
print "   2) Run `cd {{cookiecutter.package_name}}/`"
print "   3) Install Node Version Manager (nvm) https://github.com/creationix/nvm"
print "   4) Run `nvm install` to get the required version of node"
print "   5) Run `nvm use` to start using the required version of node"
print "   6) Run `npm install` to install the default project dependencies"
{% if cookiecutter.render_views -%}
print "     6a) Run `npm build` to build the front end assets"
{%- endif %}
print "   7) If you have a database:"
print "     7a) Run `createdatabase {{cookiecutter.package_name}}` to create the database"
print "     7b) Run `createuser {{cookiecutter.package_name}}` to create the database user"
if need_npm_token is True:
    print "   8) export NPM_TOKEN=a_real_npm_token_for_private_modules"
    print "   9) Run `heroku local -f Procfile.dev`\n\n"
else:
    print "   8) Run `heroku local -f Procfile.dev`\n\n"
