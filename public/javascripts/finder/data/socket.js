/*globals Ext Finder io */

Ext.ns('Finder');

/**
 * Finder.Socket
 * @class
 * requires Socket.IO.js library
 */
Finder.Socket = function(config) {
  this.constructor.call(this, config);
};

Finder.Socket.prototype = {
  
  constructor: function(config) {
    // configuration of base client libary
    io.setPath('client/');
    
    this.socket = new io.Socket(null, {port: 8080});
    this.socket.connect();
    this.socket.on('message', function(obj) {
      if ('buffer' in obj){
        for (var i in obj.buffer) this.onMessage(obj.buffer[i]);
      } else this.onMessage(obj);
    }.createDelegate(this));
  },
  
  
  onMessage: function(msg) {
    console.log(msg);
  },
  
  send: function(msg) {
    this.socket.send(msg);
  }
  
};