/*globals Ext Finder io */

Ext.ns('Finder');

/**
 * Finder.Socket
 * @class
 * requires Socket.IO.js library
 */
Finder.Socket = function(config) {
  
  config = Ext.apply({
    host: document.domain,
    port: document.location.port,
    transports: ['websocket', 'xhr-multipart', 'htmlfile', 'xhr-polling']
  }, config);
  
  io.Socket.call(this, config['host'], config);
  
  this.connect();
};

Ext.override(Finder.Socket, io.Socket.prototype);