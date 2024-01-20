const { createSocket } = require("dgram");

const client = createSocket("udp4");
const rstream = process.stdin;

client
  .on("message", (chunk) => {
    console.log(chunk.toString());
  })
  .on("error", (err) => {
    console.log("Error >> ", err);
  });

client.connect(9999, "224.0.0.1", () => {
  console.log("Hooray we are connected to server!");
  client.addMembership("224.0.0.1");
  rstream.on("data", (data) => {
    client.send(data);
  });
});
