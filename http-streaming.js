const { createServer } = require('http');
const promisify = require('util').promisify;
const { createReadStream, stat } = require('fs');

const statp = promisify(stat);

createServer(async (req, res) => {
  const range = req.headers.range;
  const { size } = await statp('./harry.mp4');

  if (range) {
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start);
    end = end ? parseInt(end) : size - 1;
    console.log(`fetching from: ${start} - ${end}`);
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4',
    });
    createReadStream('./harry.mp4', { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': 'video/mp4',
    });
    createReadStream('./harry.mp4').pipe(res);
  }
}).listen(8080, () => {
  console.log('Server listening on port 8080');
});
