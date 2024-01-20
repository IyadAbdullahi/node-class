/*const { Socket } = require("net");
const { get } = require("http");
//console.log(get);
const rStream = process.stdin;

const client = new Socket();
client.connect(80, "google.com", () => {
  console.log("connected !");
  rStream.pipe(client);
});

client
  .on("data", (d) => {
    console.log("-------------------------------");
    console.log(d.toString());
    console.log("-------------------------------");
  })
  .on("error", (err) => {
    console.log("Error >> ", err);
  });
*/
//const { createServer } = require("https");
const https = require("https");
const { createReadStream } = require("fs");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./certs/key.pem"),
  cert: fs.readFileSync("./certs/cert.pem"),
  passphrase: "shamsnet",
};

const server = https.createServer(options, (req, res) => {
  const { url, method } = req;
  if (url === "/" && method == "GET") {
    const rs = createReadStream("./www/index.html", { encoding: "utf8" });
    rs.pipe(res);
  } else if (url === "/" && method == "POST") {
    req.on("data", (body) => {
      console.log(body.toString());
    });

    res.write("<p>Thanks for a post request!<p>");
    res.end();
  } else {
    res.write("<h1>Welcome to my server !</h1>");
    res.write("<p>Pls enjoy yourself<p>");
    res.end();
  }
});

server.listen(8080, "localhost", () => {
  console.log("server ready at port 8080");
});
