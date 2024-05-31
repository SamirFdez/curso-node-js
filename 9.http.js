const http = require("node:http");
const { findAvailablePort } = require("./10.free-port");
const pc = require("picocolors");

const desiredPort = process.env.PORT ?? 1234;

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("Hola Mundo");
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listening on ${pc.blue(`http://localhost:${port}`)}`);
  });
});
