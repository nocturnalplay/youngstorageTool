sudo npm i
sudo apt install figlet lolcat sshpass
chmod +x index.js
sudo mkdir /tmp/docker_operation
sudo setfacl -m user:$USER:rw /var/run/docker.sock
sudo chmod 777 /tmp/docker_operation
sudo npm link
