const { createServer } = require("net");
const fs = require("fs");

const readStream = process.stdin;
const server = createServer((clientSock) => {
  //console.log("Hooray client connected to us! >> ", clientSock.remotePort);
  readStream.pipe(clientSock);
  clientSock.write("**************************************\n");
  clientSock.write("* Welcome to Lex HTTP text Server !! *\n");
  clientSock.write("***************************************\n");
  clientSock.write("HTTP Commands : [QUIT, GET, POST]\n");

  clientSock
    .on("data", (chunk) => {
      chunk = chunk.toString().substring(0, chunk.length - 1);
      if (chunk.startsWith("Q") || chunk.startsWith("q")) {
        clientSock.write("Server is shutting down now! Bye bye");
        process.exit(0);
      } else if (chunk.startsWith("G") || chunk.startsWith("g")) {
        const c = chunk.split(" ")[0];
        const params = chunk.split(" ")[1];
        if (params.startsWith("/") || params.startsWith("/index")) {
          const rstream = fs.createReadStream("./www/index.text");
          rstream.on("data", (d) => {
            clientSock.write(d);
          });
        }
      } else if (chunk.startsWith("P") || chunk.startsWith("p")) {
        const arr = chunk.split(" ");
        let params = arr[1];
        if (params.startsWith("SEARCH") || params.startsWith("search")) {
          params = "";
          for (let i = 1; i < arr.length; i++) {
            params = params + " " + arr[i];
          }
          let searchTerm = "";
          const searchArr = params.split("?");
          for (let i = 1; i < searchArr.length; i++) {
            searchTerm = searchTerm + " " + searchArr[i];
          }
          console.log("Searching for ... ", searchTerm);
          fs.readFile("./www/search.text", (err, content) => {
            content = content.toString();
            const resp = content.replace("<title>", searchTerm);
            console.log("response: >> ", resp);
            clientSock.write(resp);
          });
        } else if (params.startsWith("ADD") || params.startsWith("add")) {
          clientSock.write("Sum of 1 + 1 is 2");
        }
      } else {
        clientSock.write("Ooops 404 file not found!");
      }
    })
    .on("close", () => {
      console.log(`Client disconnected from us!`);
    });
});

server.listen(8888, "localhost", () => {
  console.log("Server is ready to accept tcp socket connetions on port 8888");
});
