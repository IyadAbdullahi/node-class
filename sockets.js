const { Socket } = require("net");
const fs = require("fs");

const readStream = process.stdin;
const client = new Socket();
client.connect(8888, "localhost", () => {
  console.log("Hooray am connected!");
  readStream.pipe(client);
});

readStream.on("data", (chunk) => {
  chunk = chunk.toString().substring(0, chunk.length - 1);
  if (chunk === "file") {
    let rStream = fs.createReadStream("./test4.txt");
    rStream.on("close", () => {
      console.log("Ended ...");
      client.write("Please wait ooooh!");
      readStream.pipe(client);
    });
    rStream.pipe(client);
  }
});
