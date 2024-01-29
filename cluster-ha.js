const http = require("http");
const os = require("os");
const cluster = require("cluster");

const numCPU = os.cpus().length;
const childs = [];

if (cluster.isMaster) {
  for (let i = 0; i < numCPU; i++) {
    const ch = cluster.fork();
    childs.push(ch);
  }
  childs.forEach((ch) => {
    ch.on("exit", (code, signal) => {
      console.log(code);
      console.log(`worker with id ${ch.process.pid} dies`);
      cluster.fork();
    });
  });
} else {
  makeServer();
}

function makeServer(port) {
  port = port || 3000;
  const serverId = process.pid;
  const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === "/killme") {
      res.end(`{"server":"${serverId},"msg":"is now dead"}`);
      process.exit(1);
    } else {
      res.end(`{"msg":"hello to server id:${serverId}" }`);
    }
  });

  server.listen(port, () => {
    console.log(`Server ${serverId} is ready and listening on port ${port}`);
  });
}
