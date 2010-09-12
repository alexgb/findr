/*globals Ext Finder io */

Ext.ns('Finder');

/**
 * Finder.Socket
 * @class
 * requires Socket.IO.js library
 */
Finder.Socket = function(config) {
  
  config = Ext.apply({
    host: 'localhost',
    port: 8080,
    transports: ['websocket', 'xhr-multipart', 'htmlfile', 'xhr-polling']
  }, config);
  
  io.Socket.call(this, config['host'], config);
  
  this.connect();
};

Ext.override(Finder.Socket, io.Socket.prototype);