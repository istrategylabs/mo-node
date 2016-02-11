
import subprocess

subprocess.call(["npm", "install"])
subprocess.call(["cp", "env.example", ".env"])
subprocess.call(["nvm", "install"])
subprocess.call(["nvm", "use"])
