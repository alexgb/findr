/*globals Ext Finder gm*/

Ext.ns('Finder');

Finder.MainView = Ext.extend(Ext.TabPanel, {
  
  constructor: function(config) {
    config = Ext.apply({
      tabBar: {
        dock: 'bottom',
        layout: {
          pack: 'center'
        }
      },
      fullscreen: true,
      ui: 'dark',
      animation: {
        type: 'pop'
      },
      items: [
        new Finder.MapPanel({id: 'finder-map-panel'}), {
        title: 'Friends',
        xtype: 'finder-friends-list',
        iconCls: 'team'
      }, {
        title: 'Me',
        xtype: 'finder-my-info',
        id: 'finder-my-info-panel',
        iconCls: 'user'
      }]
    }, config);
    
    this.socket = new Finder.Socket();
    this.geoLocation = new Finder.GeoLocation();
    
    Finder.MainView.superclass.constructor.call(this, config);
  },
  
  /**
   * application level events are here for the time being
   */
  initEvents: function() {
    this.myInfoPanel = Ext.getCmp('finder-my-info-panel');
    
    // socket message retrieval
    this.socket.on('message', this.onSocketMessage.createDelegate(this));
    
    // register user
    this.onUserChange();
    
    // register changes to user
    Finder.meStore.on('datachanged', this.onUserChange, this);
    
    // register changes to friends
    Finder.friendStore.on('datachanged', this.onUserChange, this);
    
    // geo location
    this.geoLocation.on('locationupdate', function(geo) {
      Ext.getCmp('finder-map-panel').setMyLocation(geo);
      this.sendLocation(geo);
    }, this);
    this.geoLocation.updateLocation();
    
    // call super
    Finder.MainView.superclass.initEvents.apply(this, arguments);
    
    // register events to update badge numbers
    Ext.each(this.getTabBar().items.items, function(tab) {
      tab.getCard().on('countchanged', function(count) {
        this.setBadge(count === 0 ? null : count);
      }, this);
    });
  },
  
  /**
   * updates server when user information changes
   */
  onUserChange: function() {
    this.socket.send({
      type: 'register',
      payLoad: {
        handle:     Finder.meStore.getAt(0).get('handle'),
        friends:    Finder.friendStore.collectRecords(['handle', 'name']),
        name:       Finder.meStore.getAt(0).get('name')
      }
    });
  },
  
  onSocketMessage: function(msg) {
    console.log('socket message received ', msg);
    switch(msg.type) {
    case 'pushFriend':
      var friend, position;
      
      friend = Finder.friendStore.findRecord('handle', msg.payLoad.handle) || Ext.ModelMgr.create({
        handle:   msg.payLoad.handle,
        name:     msg.payLoad.name
      }, 'Friend');
      Finder.friendStore.add(friend);
      
      if (msg.payLoad.position) {
        console.log(msg.payLoad.position);
        position = Ext.ModelMgr.create(Ext.apply(msg.payLoad.position, {handle: msg.payLoad.handle}), 'Position');
        Finder.positionStore.add(position);
      }
      
      // Finder.friendStore.sync();
      // if (msg.payLoad.position) {
      //   Ext.getCmp('finder-map-panel').setFriendLocation(msg.payLoad);
      // }
      break;
    }
  },
  
  sendLocation: function(position) {
    console.log('sending location', position);
    this.socket.send({
      type: 'locationNotification',
      from: Finder.meStore.getAt(0).get('handle'),
      payLoad: {
        position: {
          latitude:         position.coords.latitude,
          longitude:        position.coords.longitude,
          accuracy:         position.accuracy,
          altitude:         position.altitude,
          altitudeAccuracy: position.altitudeAccuracy,
          speed:            position.speed,
          timestamp:        position.timestampe
        }
      }
    });
  }
  
});