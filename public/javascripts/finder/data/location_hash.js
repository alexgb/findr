/*globals Ext Finder */

Ext.ns('Finder');

Finder.LocationHash = {
  
  getParam: function(key) {
    key = window.escape(key);
    return window.unescape(this._hash(document.location.hash)[key]);
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