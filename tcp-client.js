const { Socket } = require("net");
const fs = require("fs");

const readStream = process.stdin;
let client = new Socket();
client.connect(8888, "localhost", () => {
  //console.log("Hooray am connected!");
  readStream.pipe(client);
});

client
  .on("data", (chunk) => {
    console.log(chunk.toString());
  })
  .on("error", (err) => {
    console.log("Error >>> ", err);
  });

readStream.on("data", (chunk) => {
  chunk = chunk.toString().substring(0, chunk.length - 1);
  if (chunk === "file") {
    let rStream = fs.createReadStream("./test4.txt");
    rStream.on("data", (d) => {
      client.write(d);
    });
  }
});
