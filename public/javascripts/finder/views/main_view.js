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
        new Finder.MapPanel({id: 'finder-map-panel'}), 
      {
        title: 'Friends',
        xtype: 'finder-friends-list',
        iconCls: 'team'
      }, {
        title: 'Me',
        xtype: 'finder-my-info',
        id: 'finder-my-info-panel',
        iconCls: 'user',
        scroll: 'vertical'
      }]
    }, config);
    
    this.socket = new Finder.Socket({port: config.port});
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
    Finder.meStore.on('update', this.onUserChange, this);
    
    // register changes to friends
    Finder.friendStore.on('update', this.onUserChange, this);
    
    // user location requests for friends
    this.on('locationRequest', this.onLocationRequest, this);
    
    // geo location
    this.geoLocation.on('locationupdate', function(geo) {
      console.log('location', geo);
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
    
    // if user handle is blank then go to me card
    if (!(Finder.meStore.getAt(0) && Finder.meStore.getAt(0).get('handle'))) {
      this.setCard(2);
    }
    
    // if user handle specified in url location hash
    // then set current users handle
    if (Finder.LocationHash.getParam('handle')) {
      Finder.meStore.getAt(0).set('handle', Finder.LocationHash.getParam('handle'));
      Finder.meStore.sync();
    }
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
  
  /**
   * sends request to server to ask for friends location
   */
  onLocationRequest: function(record) {
    this.socket.send({
      type: 'locationRequest',
      payLoad: {
        handle:     record.get('handle')
      }
    });
    record.set('response_pending', true);
  },
  
  onSocketMessage: function(msg) {
    console.log('socket message received ', msg);
    switch(msg.type) {
    case 'pushFriend':
      var friend = Finder.friendStore.findRecord('handle', msg.payLoad.handle),
          position;
      
      if (friend) {
        friend.set(msg.payLoad);
      }
      else {
        Finder.friendStore.add(Ext.ModelMgr.create(msg.payLoad, 'Friend'));
      }
      Finder.friendStore.sync();
      
      if (msg.payLoad.position) {
        console.log(msg.payLoad.position);
        position = Ext.ModelMgr.create(Ext.apply(msg.payLoad.position, {handle: msg.payLoad.handle}), 'Position');
        Finder.positionStore.add(position);
      }
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
          speed:            position.speed
        }
      }
    });
  }
  
});