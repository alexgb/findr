/*globals Ext Finder */

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
        new Finder.MapPanel(), {
        title: 'Friends',
        xtype: 'finder-friends-list',
        iconCls: 'team',
        badgeText: '3'
      }, {
        title: 'Me',
        xtype: 'finder-my-info',
        // html: 'My Info - Name, handle',
        iconCls: 'user'
      }]
    }, config);
    
    this.socket = new Finder.Socket();
    
    
    Finder.MainView.superclass.constructor.call(this, config);
  },
  
  initEvents: function() {
    this.socket.on('message', this.onSocketMessage.createDelegate(this));
    // this.socket.connect();
    
    Finder.MainView.superclass.initEvents.apply(this, arguments);
  },
  
  onSocketMessage: function(msg) {
    // Ext.getCmp('friends-edit-button')
    console.log(msg);
  }
  
});