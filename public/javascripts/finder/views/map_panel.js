/*globals Ext Finder */

Ext.ns('Finder');

Finder.MapPanel = Ext.extend(Ext.Panel, {
  
  constructor: function(config) {
    
    config = Ext.apply({
      title: 'Map',
      iconCls: 'settings',
      badgeText: '1',
      fullscreen: true,
      items: [{
        xtype: 'map'//,
        // getLocation: true
      }]
    }, config);
    
    Finder.MainView.superclass.constructor.call(this, config);
  }
  
});

Ext.reg('finder-map-panel', Finder.MapPanel);