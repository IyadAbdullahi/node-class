//types readable, writable, duplex, transform

//const { Readable, Writable, Duplex, Transform } = require("stream");

const fs = require("fs");

function copyFileStream() {
  const fsize = 40036283;
  let chunkSize = 0;
  const frs = fs.createReadStream("./video.mp4");

  const fws = fs.createWriteStream("./video3.mp4");
  frs
    .on("data", async (chunk) => {
      //console.log("writting chunk of length > ", chunk.length);
      chunkSize += chunk.length;
      frs.pause();
      console.log("Pausing Read stream");
      await delay(5000);
      fws.write(chunk, (err) => {
        if (err) {
          console.log("Error writting chunk to destination ", err.message);
        } else {
          console.log("Chunk written successfully!");
          console.log("Resuming read stream");
          frs.resume();
          const completed = ((chunkSize / fsize) * 100).toFixed(2);
          console.log("PERCENTAGE >>>>>>>> ", completed, "%");
          //chunkSize = chunkSize + 5 * 1024 * 1024;
        }
      });
    })
    .on("end", () => {
      console.log("File has finished being read!");
      fws.close();
      console.log("Write stream closed !!!!");
    })
    .on("error", (err) => {
      console.log("An error occured >> ", err.message);
    });
}

function delay(delay) {
  console.log("Resting .....");
  setTimeout(() => {
    //console.log("Done Resting");
    return Promise.resolve();
  }, delay);
}

function getFileSize(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(err.message);
      } else {
        const { size } = stats;
        resolve(size);
      }
    });
  });
}

//iife immediately invoked function expression
(async () => {
  try {
    //const s = await getFileSize("./video.mp4");
    copyFileStream();
    //console.log("filesize = ", s);
  } catch (err) {
    console.log(err);
  }
})();
