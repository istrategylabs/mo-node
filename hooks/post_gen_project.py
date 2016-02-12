
import subprocess

{% raw %}
with open(".npmrc", "w") as text_file:
    text_file.write("//registry.npmjs.org/:_authToken=${{{0}}}".format("NPM_TOKEN"))
{% endraw %}
subprocess.call(["npm", "install"])
subprocess.call(["cp", "env.example", ".env"])
subprocess.call(["nvm", "install"])
subprocess.call(["nvm", "use"])
