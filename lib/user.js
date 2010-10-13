var EventEmitter = require('events').EventEmitter,
    sys = require('sys'),
    resource = require('./resource'),
    User;
    

User = resource.createResource();
User.key = 'handle';

exports.User = User;



/**
 * associate
 * add each user to each other's list of friends
 * @param takes any number of users and associates them
 * @static
 */
User.associate = function(user1, user2, userN) {
  var friendList;
  
  Array.prototype.slice.call(arguments).forEach(function(u1, index, users) {
    friendList = [];
    users.forEach(function(u2) {
      if (u1 !== u2) {
        u1.attributes.friends = u1.attributes.friends || [];
        if (u1.attributes.friends.indexOf(u2) === -1) {
          friendList.push(u2);
        }
      }
    });
    u1.attributes.friends = u1.attributes.friends.concat(friendList);
    if (friendList.length > 0) {
      User.emit('update', u1);
    }
  });
};

/**
 * registerFriends
 * registers a list of friends as clients and adds them to the clients
 * attributes
 *
 * @param Array list of friends
 * @public
 */
User.prototype.associate = function(friends) {
  User.associate.apply(User, friends.concat(this));
};

User.prototype.toObj = function() {
  var attrs = this.attributes;
  return {
    name:         attrs.name,
    handle:       attrs[User.key],
    connected:    attrs.socket ? attrs.socket.connected : false,
    position:     attrs.position,
    friends:      attrs.friends ? attrs.friends.map(function(f) {return f.attributes[User.key];}) : []
  };
};

