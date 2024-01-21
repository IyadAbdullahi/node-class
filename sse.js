const http = require("http");
const { createReadStream } = require("fs");

let clientReses = [];

const server = http.createServer((req, res) => {
  const { url } = req;
  if (req.headers.accept && req.headers.accept == "text/event-stream") {
    console.log("header -- accept");
    if (url == "/scores") {
      const sid = Math.ceil(Math.random() * 1000000);
      let clientObj = { sid, res };
      clientReses.push(clientObj);
      res.writeHead("200", {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
      setInterval(() => {
        const data = `USA:${Math.ceil(Math.random() * 150)} vs NIG:${Math.ceil(
          Math.random() * 150
        )}`;
        broadcastToAll(data);
      }, 2000);
    }
  } else {
    if (url == "/") {
      const rs = createReadStream("./www/sse.html");
      rs.pipe(res);
    }
  }
});

server.listen(9090, () => {
  console.log("server ready at port 9090");
});

function broadcastToAll(data) {
  clientReses.forEach((client) => {
    const { res, sid } = client;
    res.write(`id: ${sid}\n`);
    res.write(`data: ${data}\n\n`);
  });
}
