/*globals __dirname */

var sockets = require('./vendor/socket.io-node/'),
    express = require('express'),
    sys = require('sys'),
    jade = require('jade'),
    User = require('./lib/user').User,
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
app.listen(8080);


// User events
// ...........
User.on('update', function(user) {
  sys.puts('updated user: ' + user.get('name'));
  // send updated information to each friend
});


// Socket.IO
// .........
io = sockets.listen(app);

io.on('clientMessage', function(message, client) {
  var data = message.payLoad,
      user,
      friends;
  
  switch(message.type) {
  case 'register':
    // create or update user
    user = User.get(data.handle) || new User({handle: data.handle});
    user.update({
      name: data.name,
      socket: client,
      position: data.position
    });
    
    // add any friends
    friends = data.friends.map(function(f) {
      return User.get(f.handle) || new User({handle: f.handle, name: f.name});
    });
    user.associate(friends);
    
    // onClientRegister(client, message);
    break;
  case 'locationNotification':
    sys.puts('location message');
    sys.puts(sys.inspect(data));
    // user = User.get(data.from);
    // user.set('position', data.position);
    // onlocationNotification(client, message);
    break;
  case 'locationRequest':
    // onlocationRequest(client, message);
    break;
  }
  sys.puts(sys.inspect(user.toObj()));
  // printClients();
});


// // handler helpers
// 
// var _pushFriend = function(client, friend) {
//   client.client.send({
//     type: 'pushFriend',
//     payLoad: {handle: friend.handle, name: friend.name, position: friend.position, connected: !!friend.client}
//   });
// };
// 
// var _onRegisterFriends = function(fromHandle, friends) {
//   var c = clients[fromHandle],
//       i, f;
// 
//   if (c) c['friends'] = friends.map(function(frnd) {return frnd.handle});
//   
//   // register each friend as client and register user as friend
//   for (i=0; i<friends.length; i++) {
//     if (friends[i]['handle'] !== fromHandle) {
//       f = clients[friends[i]['handle']] = clients[friends[i]['handle']] || {};
//       f['friends'] = f['friends'] || [];
//       
//       // if friend doesn't exist add
//       if (f['friends'].indexOf(fromHandle) === -1) {
//         f['friends'].push(fromHandle);
//         if (f.client) {
//           _pushFriend(f, c);
//         }
//       }
//     }
//   }
// };
// 
// // handlers
// var onClientRegister = function(client, message) {
//   var handle = message.payLoad.handle,
//       c;
//   c = clients[handle] = clients[handle] || {};
//   
//   
//   c['client'] = client;
//   c['name'] = message.payLoad.name;
//   c['handle'] = handle;
//   
//   _onRegisterFriends(handle, message.payLoad.friends);
// };
// 
// 
// 
// var onlocationNotification = function(client, message) {
//   var handle = message.from,
//       c = clients[handle];
//   
//   if (c) c['position'] = message.payLoad.position;
//   
//   // message friends with location
//   c.friends.forEach(function(frnd) {
//     if (clients[frnd].client) {
//       _pushFriend(clients[frnd], c);
//     }
//   });
// };
// 
// 
// /*
//   TODO  - need to find client from client list and get name, and handle
//         - from can't be set
//         - then do hash parsing and clearing on client side load
// */
// var onlocationRequest = function(client, message) {
//   sys.puts('location request');
//   
//   var friend_handle = message.payLoad.handle;
//   // from_handle = querystring.escape(from_handle);
//   
//   email({
//     to: friend_handle,
//     from: 'alex.gibbons@gmail.com',
//     subject: 'Where are you?',
//     body: 'http://localhost:8080#'+querystring.escape(friend_handle)
//   });
// };
// 
// 
// 
// 
// 
// 
// 
// 
// 
// // Helpers
// // .......
// 
// var printClients = function() {
//   sys.puts("\033[1;47m    Clients:    \033[0m");
//   for (var handle in clients) {
//     var c = clients[handle];
//     sys.puts("\033[1;42m  " + handle + "  \033[0m" + " => ");
//     if (typeof c === "object") {
//       for (var prop in c) {
//         var v = c[prop];
//         if (prop === 'position') {
//           v = "{";
//           for (var key in c[prop]) {
//             v += key + " => " + c[prop][key] + ", ";
//           }
//           v += "}";
//         }
//         sys.puts("\t" + prop + " => " + v);
//       }
//     }
//   }
// };
// 
// /**
//  * email
//  */ 
// var email = function(message_opts) {
//   var options = "",
//       o;
//       
//   for (o in message_opts) {
//     options += ' --' + o + ' "' + message_opts[o] + '"';
//   }
//   
//   exec("ruby bin/sendmail.rb" + options, function (error, stdout, stderr) {
//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }
//   });
// };

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