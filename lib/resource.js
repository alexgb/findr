var EventEmitter = require('events').EventEmitter,
    sys = require('sys');
    

/**
 * createResource
 * this will return a Resource class that can be used to track a model
 * supports events, and basic find operations
 */
exports.createResource = function() {
  var Resource;

  /**
   * Resource constructor
   */
  Resource = function(attributes) {
    if (attributes[Resource.key] === undefined) {
      throw 'Resource missing primary key';
    }
  
    // this.associations = [];
    // this.socket = null;
    this.attributes = attributes;
    Resource.dictionary[attributes[Resource.key]] = this;
  };


  Resource.prototype.testEvent = function() {
    this.constructor.emit('test', 'foo');
  };

  /**
   * key
   * primary key
   * @static
   */
  Resource.key = 'id';

  /**
   * dictionary
   * stores a hash of all known users
   * @static
   */
  Resource.dictionary = {};

  /**
   * first
   * finds first matching user based on a property and value
   * @static
   */
  Resource.first = function(prop, value) {
    var u;
    for (u in Resource.dictionary) {
      if (Resource.dictionary[u].attributes[prop] === value) {
        return Resource.dictionary[u];
      }
    }
  };

  /**
   * get
   * returns a user based on the primary key
   * @static
   */
  Resource.get = function(id) {
    return Resource.dictionary[id];
  };

  /**
   * all
   * returns all users matching the search on property and value
   * @static
   */
  Resource.all = function(prop, value) {
    var results = [],
        u;
      
    for (u in Resource.dictionary) {
      if (Resource.dictionary[u].attributes[prop] === value) {
        results.push(Resource.dictionary[u]);
      }
    }
  
    return results;
  };

  /**
   * associate
   * add each user to each other's list of friends
   * @static
   */
  Resource.associate = function(user1, user2) {
    // user1.attributes.friends = user1.attributes.friends || [];
    // if (user1.attributes.friends.indexOf(user2.attributes[Resource.key]) === -1) {
    //   user1.attributes.friends.push()
    // }
    if (user1.associations.indexOf(user2) === -1) {
      user1.associations.push(user2);
      user1.attributes.friends.push(user2[Resource.key]);
    }
  };

  Resource.prototype.update = function(attributes) {
    var p;
    for (p in attributes) {
      this.attributes[p] = attributes[p];
    }
  };

  /**
   * registerFriends
   * registers a list of friends as clients and adds them to the clients
   * attributes
   *
   * @param Array list of friends
   * @public
   */
  Resource.prototype.registerFriends = function(friends) {
  
  };


  // Resource class should act as EventEmitter instance
  EventEmitter.call(Resource);
  for (var prop in EventEmitter.prototype) {
    Resource[prop] = EventEmitter.prototype[prop];
  }
  
  return Resource;

};