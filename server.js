/*globals __dirname */
require.paths.unshift(__dirname + "/lib");
require.paths.unshift(__dirname + "/vendor");

var express = require('express'),
    findrApp = require('findr_app'),
    fs = require('fs'),
    config,
    server;
    
config = JSON.parse(fs.readFileSync('./config/settings.json').toString());

// Express
// .......
server = express.createServer();
server.configure(function(){
  server.use(express.methodOverride());
  server.use(express.bodyDecoder());
  server.use(server.router);
  server.use(express.staticProvider(__dirname + '/public'));
});

// configuration
server.get('/config.json', function(req, res) {
  res.send(config.server);
});

server.listen(config.server.port);


// Find'r App
// ..........
findrApp.setup(config);
findrApp.listen(server);