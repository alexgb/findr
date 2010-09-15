// WORKS
/*globals __dirname */

var sockets = require('./vendor/socket.io-node/'),
    express = require('express'),
    sys = require('sys'),
    jade = require('jade'),
    clients = {},
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


// handler helpers

var _pushFriend = function(client, friend) {
  client.client.send({
    type: 'pushFriend',
    payLoad: {handle: friend.handle, name: friend.name, position: friend.position}
  });
};

var _onRegisterFriends = function(fromHandle, friends) {
  var c = clients[fromHandle],
      i, f;

  if (c) c['friends'] = friends.map(function(frnd) {return frnd.handle});
  
  // register each friend as client and register user as friend
  for (i=0; i<friends.length; i++) {
    if (friends[i]['handle'] !== fromHandle) {
      f = clients[friends[i]['handle']] = clients[friends[i]['handle']] || {};
      f['friends'] = f['friends'] || [];
      
      // if friend doesn't exist add
      if (f['friends'].indexOf(fromHandle) === -1) {
        f['friends'].push(fromHandle);
        if (f.client) {
          _pushFriend(f, c);
        }
      }
    }
  }
};

// handlers
var onClientRegister = function(client, message) {
  var handle = message.payLoad.handle,
      c;
  c = clients[handle] = clients[handle] || {};
  
  c['client'] = client;
  c['name'] = message.payLoad.name;
  c['handle'] = handle;
  
  _onRegisterFriends(handle, message.payLoad.friends);
};



var onlocationNotification = function(client, message) {
  var handle = message.from,
      c = clients[handle];
  
  if (c) c['position'] = message.payLoad.position;
  
  // message friends with location
  c.friends.forEach(function(frnd) {
    if (clients[frnd].client) {
      _pushFriend(clients[frnd], c);
    }
  });
};


io = sockets.listen(app);

io.on('clientConnect', function(client){
 // client.send({ buffer: buffer });
 // client.broadcast({ announcement: client.sessionId + ' connected' });
 // 
 // client.on('message', function(message){
 //   var msg = { message: [client.sessionId, message] };
 //   buffer.push(msg);
 //   if (buffer.length > 15) buffer.shift();
 //   client.broadcast(msg);
 // });
 // 
 // client.on('disconnect', function(){
 //   client.broadcast({ announcement: client.sessionId + ' disconnected' });
 // });
});


io.on('clientMessage', function(message, client) {
  switch(message.type) {
  case 'register':
    onClientRegister(client, message);
    break;
  case 'locationNotification':
    onlocationNotification(client, message);
    break;
  }
  sys.puts(sys.inspect(clients, true, 2));
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