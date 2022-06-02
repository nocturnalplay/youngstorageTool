import fs from "fs";
import clr from "./color.js";

//create Dockerfile
export const CreateDockerFile = (username, port, password) => {
  // const user = username;
  // const password = user + "@098";
  // const PORT = port;
  //write the docker file
  const dockercmd = `FROM ubuntu:latest
RUN apt update
RUN apt install openssh-server nano htop ufw sudo -y
RUN apt install -y net-tools netcat curl apache2 inetutils-ping php libapache2-mod-php php-mysql \
apt-utils lolcat figlet iproute2
RUN apt install -y python python3 nodejs npm gcc default-jre bc git vim gdb
RUN service apache2 start
RUN service ssh start
RUN echo 'root:admin' | chpasswd
RUN echo "clear" >> /etc/bash.bashrc
RUN echo "figlet -t -c youngstorage | lolcat" >> /etc/bash.bashrc
EXPOSE 22
EXPOSE 80/tcp
EXPOSE 80/udp
RUN sudo adduser ${username} --gecos "" --disabled-password
RUN echo "${username}:${password}" | sudo chpasswd
RUN usermod -aG sudo ${username}
RUN cd /home/${username} && echo "PS1='💻️ (\\[\\033[1;36m\\]\\u@\\h\\[\\033[0m\\]) \\[\\033[1;34m\\]\\w\\[\\033[0;35m\\] \\[\\033[1;36m\\]# \\[\\033[0m\\]'" >> .bashrc
CMD ["/usr/sbin/sshd","-D"]
`;
  try {
    console.log(clr.Start("[*]creating Dockerfile....."));
    fs.writeFileSync("/tmp/docker_operation/Dockerfile", dockercmd);
    console.log(clr.Success("[*]Dockerfile have been created successfully"));
  } catch (error) {
    console.log("Error:", clr.Error(error));
    process.exit(1);
  }
};
