/*globals __dirname */

var sockets = require('./vendor/socket.io-node/'),
    express = require('express'),
    sys = require('sys'),
    jade = require('jade'),
    User = require('./lib/user').User,
    email = require('./lib/email'),
    querystring = require('querystring'),
    debug = require('./lib/debug'),
    fs = require('fs'),
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
  var friends = user.get('friends'),
      friend_socket;

  if (friends) {
    friends.forEach(function(f) {
      friend_socket = f.get('socket');
      if (friend_socket && friend_socket.connected) {
        sys.puts('should be updating user ' + f.get('name') + 'with new friend info');
        friend_socket.send({ type: 'pushFriend', payLoad: user.toObj()});
      }
    });
  }
});

// DEBUG
// .....

debug.count = 0;

// Email
// .....
email.setup(JSON.parse(fs.readFileSync('./config/settings.json').toString()).email);


// Socket.IO
// .........
io = sockets.listen(app);

io.on('clientMessage', function(message, client) {
  var data = message.payLoad,
      user,
      friends;
      
  debug.count++;
  
  sys.puts(debug.count + ' client message: ' + message.type + ', ' + data.handle);
  debug.printUsers(User);
  
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
    break;
    
  case 'locationNotification':
    user = User.get(message.from);
    user.set('position', data.position);
    break;
    
  case 'locationRequest':
    sys.puts(querystring.escape(email));
    email.send({
      to: data.handle,
      from: 'alex.gibbons@gmail.com',
      subject: 'Where are you?',
      body: 'http://localhost:8080#' + querystring.escape(data.handle)
    });
    break;
  }
});

io.on('clientDisconnect', function(client) {
  var user;
  
  user = User.first('socket', client);
  user.set('socket', null);
});