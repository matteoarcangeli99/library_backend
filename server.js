const https = require("https");
const app = require("./app");
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server= https.createServer(options, app); 
server.listen(443);
//server.listen(process.env.PORT ? process.env.PORT : 8090, process.env.IP || "0.0.0.0");



/*
const crypto = require('crypto'),
  fs = require("fs"),
  http = require("http");

var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

var credentials = crypto.createCredentials({key: privateKey, cert: certificate});

var handler = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
};*/
/*var handler = function (req, res) {}
var server = http.createServer();
server.setSecure(credentials);
server.addListener("request", handler);
server.listen(8000);*/
/*
const http = require("https");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT ? process.env.PORT : 8080, process.env.IP || "0.0.0.0");*/
/*

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
httpsServer.listen(8443);*/



