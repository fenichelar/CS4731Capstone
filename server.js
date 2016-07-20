#!/usr/bin/env node

var static = require("node-static");

var server = new static.Server("./dist");

console.log("Servering...");

require("http").createServer(function (request, response) {
  request.addListener("end", function () {
    server.serve(request, response);
  }).resume();
}).listen(8090);
