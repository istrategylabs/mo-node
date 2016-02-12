
import subprocess
import os

{% if cookiecutter.use_npm_token == 'y' -%}
npm_token = os.environ.get("NPM_TOKEN")
# npm won't allow us to perform an npm install if we're using .npmrc and the
# NPM_TOKEN isn't actually set. We set it temporarily. The value set here will
# not persist. You will need to actually set the NPM_TOKEN environment variable
# before attempting to install a private npm module.
if npm_token is None:
    os.putenv('NPM_TOKEN','omg_change_immediately')
    print "\n*****************************************************************"
    print "Oh, hai!"
    print "I see you've chosen to setup your .npmrc file - good for you."
    print "You don't seem to have 'NPM_TOKEN' set in your environment."
    print "You'll absolutely need to set that to a valid token in order to"
    print "install a private npm module."
    print "Read more about .npmrc at https://docs.npmjs.com/files/npmrc"
    print "*****************************************************************\n"


{% raw %}
with open(".npmrc", "w") as text_file:
    text_file.write("//registry.npmjs.org/:_authToken=${{{0}}}".format("NPM_TOKEN"))
{% endraw %}
{%- endif %}
subprocess.call(["npm", "install"])
subprocess.call(["cp", "env.example", ".env"])
subprocess.call(["nvm", "install"])
subprocess.call(["nvm", "use"])
