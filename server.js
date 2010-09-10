// WORKS
/*globals __dirname */

var sockets = require('./vendor/socket.io-node/'),
    express = require('express'),
    sys = require('sys'),
    jade = require('jade'),
    buffer = [],
    app,
    io;

// Express
// .......
app = express.createServer();
app.set('view engine', 'jade');
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyDecoder());
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));
});

// express response
app.get('/hello', function(req, res){
    res.send('hello world');
});

// jade rendered response
app.get('/test', function(req, res){
    res.render('test', {
      locals: {
        title: 'Jade working!'
      }
    });
});

app.listen(8080);


// Socket.IO
// .........

io = sockets.listen(app);

io.on('connection', function(client){
 client.send({ buffer: buffer });
 client.broadcast({ announcement: client.sessionId + ' connected' });

 client.on('message', function(message){
   var msg = { message: [client.sessionId, message] };
   buffer.push(msg);
   if (buffer.length > 15) buffer.shift();
   client.broadcast(msg);
 });

 client.on('disconnect', function(){
   client.broadcast({ announcement: client.sessionId + ' disconnected' });
 });
});


// Helpers
// .......

// function(path) {
//   try {
//    var swf = path.substr(-4) === '.swf';
//    res.writeHead(200, {'Content-Type': swf ? 'application/x-shockwave-flash' : ('text/' + (path.substr(-3) === '.js' ? 'javascript' : 'html'))});
//    fs.readFile(__dirname + path, swf ? 'binary' : 'utf8', function(err, data){
//      if (!err) res.write(data, swf ? 'binary' : 'utf8');
//      res.end();
//    });
//  } catch(e){ 
//    send404(res); 
//  }
// }