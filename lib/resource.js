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
    var p;
    if (attributes[Resource.key] === undefined) {
      throw 'Resource missing primary key';
    }
    this.attributes = {};
    for (p in attributes) {
      this.attributes[p] = attributes[p];
    }
    Resource.dictionary[attributes[Resource.key]] = this;
    this.constructor.emit('create', this);
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

  Resource.prototype.update = function(attributes) {
    var p;
    for (p in attributes) {
      this.attributes[p] = attributes[p];
    }
    this.constructor.emit('update', this);
  };
  
  Resource.prototype.set = function(attribute, value) {
    this.attributes[attribute] = value;
    this.constructor.emit('update', this);
  };
  
  Resource.prototype.get = function(attribute) {
    return this.attributes[attribute];
  };


  // Resource class should act as EventEmitter instance
  EventEmitter.call(Resource);
  for (var prop in EventEmitter.prototype) {
    Resource[prop] = EventEmitter.prototype[prop];
  }
  
  return Resource;

};