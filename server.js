/*globals __dirname */
require.paths.unshift(__dirname + "/lib");
require.paths.unshift(__dirname + "/vendor");

var express = require('express'),
    findrApp = require('findr_app'),
    server;

// Express
// .......
server = express.createServer();
server.configure(function(){
  server.use(express.methodOverride());
  server.use(express.bodyDecoder());
  server.use(server.router);
  server.use(express.staticProvider(__dirname + '/public'));
});
server.listen(8080);


// Find'r App
// ..........
findrApp.listen(server);