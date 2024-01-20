const { createSocket } = require("dgram");
const { log } = require("util");

const server = createSocket("udp4");

server
  .on("message", (chunk, client) => {
    //console.log(client);
    chunk = chunk.toString();
    console.log(chunk);
    server.send(chunk, client.port, client.address);
    server.addMembership("224.0.0.1");
  })
  .on("error", (err) => {
    console.log("Error >> ", err);
  });

server.bind(9999, "localhost", () => {
  console.log("Server is ready and listening on port 9999");
});
