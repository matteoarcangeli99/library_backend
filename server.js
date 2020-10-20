const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT ? process.env.PORT : 8080, process.env.IP || "0.0.0.0");