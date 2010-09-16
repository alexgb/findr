/*globals Ext Finder google */

Ext.ns('Finder');

Finder.MapPanel = Ext.extend(Ext.Panel, {
  
  constructor: function(config) {
    
    // property to track badge notifications
    this.unViewedMarkers = 0;
    this.friendMarkers = {};
    this.store = Finder.positionStore;
    
    config = Ext.apply({
      title: 'Map',
      iconCls: 'settings',
      fullscreen: true,
      items: [{
        xtype: 'map',
        id: 'finder-g-map'
      }]
    }, config);
    
    this.meMarkerImage = new google.maps.MarkerImage(
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
  
  
  initEvents: function() {
    
    // null badges when activating panel
    this.on('activate', function() {
      this.unViewedMarkers = 0;
      this.fireEvent('countchanged', this.unViewedMarkers);
    });
    
    // create markers when adding position records
    this.store.on('add', function(store, records) {
      Ext.each(records, function(rec) {
        var friend = Finder.friendStore.findRecord('handle', rec.get('handle'));
        console.log(friend);
        
        this._createMarker(rec.data, 'friend', rec.get('handle'));
      }, this);
    }, this);
    
    // fire badge changing event when store changess
    this.store.on('datachanged', function(store) {
      this.unViewedMarkers++;
      this.fireEvent('countchanged', this.unViewedMarkers);
    }, this);
    
    Finder.MainView.superclass.initEvents.apply(this, arguments);
  },
  
  
  setMyLocation: function(position) {
    this._createMarker(position, 'me', 'Me');
  },
  
  // setFriendLocation: function(friendObject) {
  //   this._createMarker(friendObject.position, 'friend', friendObject.name + " <" + friendObject.handle + ">");
  //   this.unViewedMarkers++;
  //   this.fireEvent('countchanged', this.unViewedMarkers);
  // },
  
  
  _createMarker: function(position, type, title) {
    var coordinates = new google.maps.LatLng(position.latitude, position.longitude),
        gMap = Ext.getCmp('finder-g-map').map,
        markerImage;
        
    markerImage = function(t) {
      return this[t + "MarkerImage"];
    }.call(this, type);
    
    if (this.myMarker) {
      this.myMarker.setPosition(coordinates);
    }
    else {
      this.myMarker = new google.maps.Marker({
         position: coordinates,
         icon: markerImage,
         shadow: this.markerShadowImage,
         title : title,
         map: gMap
      });

      gMap.panTo(coordinates);
    }
  }
  
  
});

Ext.reg('finder-map-panel', Finder.MapPanel);