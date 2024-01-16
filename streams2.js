const fs = require("fs");
const { Transform } = require("stream");
let input = process.stdin;
let writeStream = fs.createWriteStream("name.txt");

class Upper extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, enc, cb) {
    chunk = chunk.toString().toUpperCase();
    cb(null, chunk);
  }
}

class ReplaceA extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, enc, cb) {
    chunk = chunk.toString().replace(/A/g, 9);
    cb(null, chunk);
  }
}

class Encrypt extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, enc, cb) {
    let ret = "";
    chunk = chunk.toString().substring(0, chunk.length - 1);
    console.log(chunk, chunk.length);
    for (let i = 0; i < chunk.length; i++) {
      ret += convert(chunk[i]);
    }
    cb(null, ret);
  }
}

const up = new Upper();
const repA = new ReplaceA();
const enc = new Encrypt();

//input.pipe(enc).pipe(up).pipe(repA).pipe(writeStream);

input
  .on("data", (d) => {
    let data = d.toString();
    if (data.includes("exit") || data.includes("quit")) {
      console.log("Bye bye !!!");
      writeStream.close();
      process.exit(0);
    }
  })
  .on("error", (err) => {
    console.log(err);
  });

function convert(val) {
  let ret = "";
  switch (val) {
    case " ":
      ret = " ";
      break;
    case "a":
      ret = "z";
      break;
    case "b":
      ret = "y";
      break;
    case "c":
      ret = "x";
      break;
    case "d":
      ret = "w";
      break;
    case "e":
      ret = "v";
      break;
    case "f":
      ret = "u";
      break;
    case "g":
      ret = "t";
      break;
    case "h":
      ret = "s";
      break;
    case "i":
      ret = "r";
      break;
    case "j":
      ret = "q";
      break;
    case "k":
      ret = "p";
      break;
    case "l":
      ret = "o";
      break;
    case "m":
      ret = "n";
      break;
    case "n":
      ret = "m";
      break;
    case "o":
      ret = "l";
      break;
    case "p":
      ret = "k";
      break;
    case "q":
      ret = "j";
      break;
    case "r":
      ret = "i";
      break;
    case "s":
      ret = "h";
      break;
    case "t":
      ret = "g";
      break;
    case "u":
      ret = "f";
      break;
    case "v":
      ret = "e";
      break;
    case "w":
      ret = "d";
      break;
    case "x":
      ret = "c";
      break;
    case "y":
      ret = "b";
      break;
    case "z":
      ret = "a";
      break;
  }
  return ret;
}

const myTransform = Transform({
  transform(chunk, enc, cb) {
    chunk = chunk.toString();
    cb(null, chunk.toUpperCase());
  },
});

let stdout = process.stdout;
input.pipe(myTransform).pipe(stdout);
