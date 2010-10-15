/*globals Ext Finder */

Ext.ns('Finder');

Finder.LocationHash = {
  
  getParam: function(key) {
    var value;
    
    key = window.escape(key);
    value = this._hash(document.location.hash)[key];
    return value !== undefined ? window.unescape(value) : value;
  },
  
  _hash: function(hash_string) {
    var kvp = document.location.hash.substr(1).split('&'),
        hash = {};
    
    var i=kvp.length; var x; while(i--) {
      x = kvp[i].split('=');
      hash[x[0]] = x[1];
    }
    return hash;
  }
};