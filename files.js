const fsp = require("fs/promises");
const fs = require("fs/promises");
const { promisify } = require("util");

const rf = promisify(fs.readFile);
const wf = promisify(fs.writeFile);

function all() {
  fs.writeFile("./test.txt", "Hello !\n", (err) => {
    if (err) {
      console.log("Error writting data to file!", err.message);
    } else {
      console.log("File created !");
    }
  });

  fs.appendFile("./test.txt", "Another data!\n", (err) => {
    if (err) {
      console.log("Error appending data to file!", err.message);
    } else {
      console.log("File appended !");
    }
  });

  fs.chmod("./test.txt", "0666", (err) => {
    if (err) {
      console.log("Error changing file mode!", err.message);
    } else {
      console.log("File mode changed !");
    }
  });

  fs.lstat("./test.txt", (err, stats) => {
    if (err) {
      console.log(err.message);
    } else {
      stats.console.log(stats);
    }
  });
}

copyPromise();

async function copyPromise() {
  try {
    //const content = await rf("./test.txt");
    const content = await fsp.readFile("./test.txt");
    //await wf("./test3.txt", content);
    await fsp.writeFile("./test4.txt", content);
    console.log("file copied to test4.txt !!!!");
  } catch (err) {
    console.log("Error >> ", err.message);
  }
}

function copy() {
  fs.readFile("./test.txt", (err, content) => {
    if (err) {
      console.log(err.message);
    } else {
      fs.writeFile("./test2.txt", content, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("file copied to test2.txt !!!!");
        }
      });
    }
  });
}
