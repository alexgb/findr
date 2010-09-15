/*globals Ext Finder */

Ext.ns('Finder');

Finder.GeoLocation = Ext.extend(Ext.util.GeoLocation, {
  
  constructor: function(config) {
    
    config = Ext.apply({
      autoUpdate: true
    }, config);
    
    Finder.GeoLocation.superclass.constructor.call(this, config);
    this.initEvents();
  },
  
  initEvents: function() {
    this.on('locationerror', function( geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
      alert('Your location could not be determined.');
    });
  }
  
});