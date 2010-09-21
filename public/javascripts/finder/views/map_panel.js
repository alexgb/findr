/*globals Ext Finder google */

Ext.ns('Finder');

Finder.MapPanel = Ext.extend(Ext.Panel, {
  
  constructor: function(config) {
    
    // property to track badge notifications
    this.unViewedMarkers = 0;
    
    this.friendMarkers = {};
    this.myMarker = null;
    this.store = Finder.positionStore;
    
    // google maps info window
    this.infoWindow = new google.maps.InfoWindow({
      size: new google.maps.Size(50,50)
    });
    
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
      Ext.each(records, function(positionRec) {
        this.drawFriend(positionRec);
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
    var coordinates = new google.maps.LatLng(position.latitude, position.longitude);
    
    if (this.myMarker) {
      this.myMarker.setPosition(coordinates);
    } else {
      this.myMarker = this._createMarker(position, 'me', 'Me');
      this._getMapCmp().panTo(coordinates);
    }
  },
  
  
  drawFriend: function(positionRec) {
    var coordinates = new google.maps.LatLng(positionRec.get('latitude'), positionRec.get('longitude')),
        handle = positionRec.get('handle'),
        friend = Finder.friendStore.findRecord('handle', handle),
        title = friend ? friend.get('name') + " <" + handle + ">" : handle,
        map = this._getMapCmp(),
        marker;
    
    // draw marker for friend
    if (marker = this.friendMarkers[handle]) {
      marker.setPosition(coordinates);
    } else {
      marker = this._createMarker(positionRec.data, 'friend', title);
      this.friendMarkers[handle] = marker;
      
      // register overlay events
      google.maps.event.addListener(marker, 'click', function() {
        var el = document.createElement('div');
        el.setAttribute('class', 'x-html');
        el.innerHTML = String.format("<h3>{0}</h3><p>{1}</p><p>{2}", friend.get('name'), friend.get('handle'), positionRec.get('created_at').format("l, F d, Y g:i:s A"));
        
        this.infoWindow.setContent(el);
        this.infoWindow.open(this._getMapCmp(), marker);
      }.createDelegate(this));
    }
    
    map.panTo(coordinates);
  },
  
  _createMarker: function(position, type, title) {
    var coordinates = new google.maps.LatLng(position.latitude, position.longitude),
        markerImage;
        
    markerImage = function(t) {
      return this[t + "MarkerImage"];
    }.call(this, type);
    
    return new google.maps.Marker({
       position: coordinates,
       icon: markerImage,
       shadow: this.markerShadowImage,
       title : title,
       map: this._getMapCmp()
    });
  },
  
  _getMapCmp: function() {
    return Ext.getCmp('finder-g-map').map;
  }
  
  
});

Ext.reg('finder-map-panel', Finder.MapPanel);