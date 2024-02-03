const http = require('http');
const { request } = require('http');

class ServiceRegistry {
  constructor() {
    console.log('Initialising registry ....');
    this.serversCount = 0;
    this.requestCount = 0;
    this.servers = [];
    setInterval(() => {
      console.log('Cleaning dead servers ...');
      this.#clean();
    }, 5000);
  }

  #clean() {
    this.servers.forEach((s) => {
      if (Math.floor(+new Date() / 1000) - s.time > 7) {
        console.log('removing server :', s);
        delete this.servers[s];
        this.serversCount--;
      } else {
        console.log('All servers are alive');
      }
    });
  }

  getServer() {
    const serverNo = this.requestCount % this.servers.length;
    const serverToHit = this.servers[serverNo];
    this.requestCount++;
    return serverToHit;
  }

  announce(ip, port) {
    console.log('serveice announcement');
    this.servers.push({
      id: this.serversCount,
      ip,
      port,
      time: Math.floor(+new Date() / 1000),
    });
    this.serversCount++;
    return this.serversCount - 1;
  }

  heartbeat(id) {
    console.log('heratbeat update from ', id);
    this.servers.forEach((s) => {
      if (s.id == id) {
        s.time = Math.floor(+new Date() / 1000);
      }
    });
  }
}

const registry = new ServiceRegistry();
const lbIP = '192.168.1.24';
const lbPort = 3000;
create(4000, '192.168.1.24');
create(4001, '192.168.1.24');
create(4002, '192.168.1.24');
create(4003, '192.168.1.24');

createLB();

function create(port, iface) {
  iface = iface || 'localhost';
  const sid = registry.announce(iface, port);
  const serverId = Math.ceil(Math.random() * 1000);
  const server = http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    res.end(
      `{
        "serverId":"${serverId}",
        "host":${JSON.stringify(server.address())}
    }`
    );
  });

  server.listen(port, iface, () => {
    console.log(`server listening on port${port} and interface: ${iface}`);
    setInterval(() => {
      sendHeartbeat(sid, (err, hres) => {
        if (err) {
          console.log(err);
        } else {
          console.log('server id:' + sid + ' hresponse: ' + hres);
        }
      });
    }, 5000);
  });
}

function createLB() {
  console.log('Servers available: ', registry.serversCount);

  const server = http.createServer((req, res) => {
    const url = req.url;
    if (url.includes('announce') && req.method === 'PUT') {
      console.log('announcing .....');
      const ip = url.split('/')[1];
      const port = url.split('/')[2];
      const id = registry.announce(ip, port);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(`{"id":${id}}`);
    } else if (url.includes('heartbeat') && req.method === 'PUT') {
      console.log('sending heartbeat .....');
      const id = url.split('/')[1];
      registry.heartbeat(id);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(`{"heartbeat":"updated"}`);
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      const opt = {
        hostname: registry.getServer().ip,
        port: registry.getServer().port,
        method: 'GET',
        path: '/',
      };

      const r = request(opt, (response) => {
        let body = '';
        response
          .on('data', (chunk) => {
            body += chunk;
          })
          .on('error', (err) => {
            console.log('errr >>>', err);
          })
          .on('end', () => {
            res.end(body.toString());
          });
      });
      r.on('error', (err) => {
        console.log('Request Err >> ', err);
        res.end(err);
      });
      r.end();
    }
  });
  server.listen(lbPort, lbIP, () => {
    console.log(`server listening on port${lbPort} and interface: ${lbIP}`);
  });
}

function sendHeartbeat(id, cb) {
  const opt = {
    hostname: lbIP,
    port: lbPort,
    method: 'PUT',
    path: '/heartbeat/' + id,
  };

  const r = request(opt, (response) => {
    let body = '';
    response
      .on('data', (chunk) => {
        body += chunk;
      })
      .on('error', (err) => {
        console.log('errr >>>', err);
      })
      .on('end', () => {
        cb(null, body.toString());
      });
  });
  r.on('error', (err) => {
    console.log('Request Err >> ', err);
    cb(err, null);
  });
  r.end();
}
