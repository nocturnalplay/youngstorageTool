#!/usr/bin/env node

import commander from "commander";
import chalk from "chalk";
import { CreateDockerFile } from "./features/container.js";
import clr from "./features/color.js";
import { banner, ConBanner } from "./features/banner.js";
import { spawn } from "child_process";
import { FilteredPort } from "./features/portfilter.js";

commander
  .version(chalk.green("youngstorage 1.0"), "-v, --version")
  .usage(
    "[OPTIONS][-h : help],[-v : version],[-u <value> : username],[-p <value> : port]"
  )
  .option("-u, --username <value>", "name of the user")
  .option("-p, --port <value>", "port for your container")
  .option("-q, --quit", "for skip the banner")
  .parse(process.argv);

const { username, port, quit } = commander.opts();
const password = username + "098";
const ListenPort = FilteredPort();
const portstate = ListenPort.filter((a) => a === port);
let nonError = true;
//clear the console
console.clear();

//show banner
if (!quit) {
  banner();
}

//port verify if it is already exist or not
if (port) {
  if (portstate.length) {
    console.log(
      clr.Error(`[*] ${port} port is already up. please choose some other.`)
    );
    process.exit(1);
  } else {
    console.log(clr.Success(`[*] port verified, Currently not in use.`));
  }
}
//creating Dockerfile for the ubuntu container
if (username && port) {
  CreateDockerFile(username, port, password);
  //-------------------------------------------------------------------------------
  DockerBuildHappening(username);
  //-------------------------------------------------------------------------------
} else {
  console.log(clr.Error("[*] required username and port"));
  console.log(clr.Info("[*] for help use -h --help"));
}

//docker build function
function DockerBuildHappening(username) {
  //start loading spinner
  const load = clr.Spinner("aesthetic", "building the Docker container");

  //docker build start
  const build = spawn(`docker`, ["build", "-t", `${username}:latest`, "/tmp/docker_operation"]);
  // const build = spawn('docker',['build','-t',`anish`,'.']);

  //Docker building reliable output
  build.stdout.on("data", (msg) => {
    process.stdout.clearLine();
    console.log(clr.Info(`${msg}`));
  });

  //spawn executing after completion
  build.stdout.on("end", () => {
    process.stdout.clearLine();
    clearInterval(load);
    console.log(clr.Success("[*]DockerFile build successfully"));
    //------------------------------
    //run the builted Docker container
    DockerRunHappening(username, port);
    //------------------------------
  });
}

//after completting the docker build this running the builted container will happen
function DockerRunHappening(username, port) {
  console.log(clr.Success("[*]Docker Image Start running"));
  //start loading spinner
  const load = clr.Spinner("aesthetic", "Docker running the builted container");

  //docker run start
  const build = spawn(`docker`, [
    "run",
    "--hostname",
    "youngstorage",
    "--name",
    `${username}`,
    "-dp",
    `${port}:22`,
    "-p",
    `${parseInt(port)+1}:80`,
    "-p",
    `${parseInt(port)+2}:5500`,
    "-p",
    `${parseInt(port)+3}:3000`,
    "-p",
    `${parseInt(port)+4}:8000`,
    "-v",
    `${username}:/home/${username}`,
    `${username}`,
  ]);

  //Docker run reliable output
  build.stdout.on("data", (msg) => {
    process.stdout.clearLine();
    console.log(clr.Info(`${msg}`));
    nonError = true;
  });

  //while Docker running if Error happens
  build.stderr.on("data", (msg) => {
    process.stdout.clearLine();
    console.log(clr.Error(`[*] ${msg}`));
    nonError = false;
    DockerRemoveImage(username);
  });
  //spawn executing after completion
  build.stdout.on("end", () => {
    process.stdout.clearLine();
    clearInterval(load);
    if (nonError) {
      console.log(clr.Success("[*]Docker Image successfully completed"));
      console.log(clr.Success("[*]now ready to use"));
      //finally created banner and ssh connection info
      ConBanner(username, password);
    }
  });
}

//Docker image exist error for removing that
function DockerRemoveImage(username) {
  //start loading spinner
  const load = clr.Spinner("aesthetic", "Removing existing Docker Image");

  //docker build start
  const build = spawn(`docker`, ["rm", "-f", `${username}`]);

  //Docker building reliable output
  build.stdout.on("data", (msg) => {
    process.stdout.clearLine();
    console.log(clr.Info(`[*]${msg}`));
  });

  //spawn executing after completion
  build.stdout.on("end", () => {
    process.stdout.clearLine();
    clearInterval(load);
    console.log(clr.Success("[*]Docker Image Removed Successfully"));
    //------------------------------
    //run the builted Docker container
    DockerRunHappening(username, port);
    //------------------------------
  });
}
