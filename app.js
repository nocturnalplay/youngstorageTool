// //docker build function
// export default function DockerBuildHappening(username) {
//     //start loading spinner
//     const load = clr.Spinner("aesthetic", "building the Docker container");
  
//     //docker build start
//     const build = spawn(`docker`, ["build", "-t", `${username}:latest`, "."]);
  
//     //Docker building reliable output
//     build.stdout.on("data", (msg) => {
//       process.stdout.clearLine();
//       console.log(clr.Info(`${msg}`));
//     });
  
//     //spawn executing after completion
//     build.stdout.on("close", () => {
//       process.stdout.clearLine();
//       clearInterval(load);
//       console.log(clr.Success("[*]DockerFile build successfully"));
//       //------------------------------
//       //run the builted Docker container
//       DockerRunHappening(username, port);
//       //------------------------------
//     });
//   }
  
//   //after completting the docker build this running the builted container will happen
//   function DockerRunHappening(username, port) {
//     //start loading spinner
//     const load = clr.Spinner("aesthetic", "Docker running the builted container");
  
//     //docker run start
//     const build = spawn(`docker`, [
//       "run",
//       "--hostname",
//       "youngstorage",
//       "--name",
//       `${username}`,
//       "-dp",
//       `${port}:22`,
//       `${username}`,
//     ]);
  
//     //Docker run reliable output
//     build.stdout.on("data", (msg) => {
//       process.stdout.clearLine();
//       console.log(clr.Info(`${msg}`));
//     });
  
//     //while Docker running if Error happens
//     build.stderr.on("data", (msg) => {
//       process.stdout.clearLine();
//       console.log(clr.Error(`[*] ${msg}`));
//       DockerRemoveImage(username);
//     });
//     //spawn executing after completion
//     build.stdout.on("close", () => {
//       process.stdout.clearLine();
//       clearInterval(load);
//       console.log(clr.Success("[*]Docker successfully completed"));
//       console.log(clr.Success("[*]now ready to use"));
//       //finally created banner and ssh connection info
//       ConBanner(username, password);
//     });
//   }
  
//   //Docker image exist error for removing that
//   function DockerRemoveImage(username) {
//     //start loading spinner
//     const load = clr.Spinner("aesthetic", "Removing existing Docker Image");
  
//     //docker build start
//     const build = spawn(`docker`, ["rm", "-f", `${username}`]);
  
//     //Docker building reliable output
//     build.stdout.on("data", (msg) => {
//       process.stdout.clearLine();
//       console.log(clr.Info(`${msg}`));
//     });
  
//     //spawn executing after completion
//     build.stdout.on("close", () => {
//       process.stdout.clearLine();
//       clearInterval(load);
//       console.log(clr.Success("[*]Docker Image Removed Successfully"));
//       //------------------------------
//       //run the builted Docker container
//       DockerRunHappening(username, port);
//       //------------------------------
//     });
//   }
  