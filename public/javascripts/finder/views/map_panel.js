/*globals Ext Finder google */

Ext.ns('Finder');

Finder.MapPanel = Ext.extend(Ext.Panel, {
  
  constructor: function(config) {
    
    config = Ext.apply({
      title: 'Map',
      iconCls: 'settings',
      badgeText: '1',
      fullscreen: true,
      items: [{
        xtype: 'map',
        id: 'finder-g-map'//,
        // getLocation: true
      }]
    }, config);
    
    this.myMarkerImage = new google.maps.MarkerImage(
      'images/me_point.png',
      new google.maps.Size(32, 31),
      new google.maps.Point(0,0),
      new google.maps.Point(16, 31)
    );
    
    this.friendMarkerImage = new google.maps.MarkerImage(
      'images/friend_point.png',
      new google.maps.Size(32, 31),
      new google.maps.Point(0,0),
      new google.maps.Point(16, 31)
    );
        
    this.markerShadowImage = new google.maps.MarkerImage(
      'images/shadow.png',
      new google.maps.Size(64, 52),
      new google.maps.Point(0,0),
      new google.maps.Point(-5, 42)
    );
    
    Finder.MainView.superclass.constructor.call(this, config);
  },
  
  
  setMyLocation: function(position) {
    var coordinates = new google.maps.LatLng(position.latitude, position.longitude),
        gMap = Ext.getCmp('finder-g-map').map;
    
    if (this.myMarker) {
      this.myMarker.setPosition(coordinates);
    }
    else {
      this.myMarker = new google.maps.Marker({
         position: coordinates,
         icon: this.myMarkerImage,
         shadow: this.markerShadowImage,
         title : 'Me',
         map: gMap
      });

      gMap.panTo(coordinates);
    }
  }
  
  
});

Ext.reg('finder-map-panel', Finder.MapPanel);