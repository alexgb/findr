/*globals Ext Finder */

Ext.ns('Finder');

Finder.FriendsList = Ext.extend(Ext.List, {
  
  constructor: function(config) {
    config = Ext.apply({
      fullscreen: true,
      store: Finder.store,
      tpl: '<tpl for="."><div class="contact"><strong>{name}</strong> {handle}</div></tpl>',
      itemSelector: 'div.contact',
      singleSelect: true,
      scroll: 'vertical',
      dockedItems: [{
        dock : 'top',
        title: 'Friends',
        xtype: 'toolbar',
        items: [{
          xtype: 'spacer'
        }, {
          text   : 'Add',
          iconCls: 'add',
          scope  : this,
          handler: this.addHandler
        }]
      }, {
        dock: 'bottom',
        xtype: 'toolbar',
        defaults: {
          ui: 'mask',
          xtype: 'button'
        },
        items: [{
          id: 'friends-delete-button',
          iconCls: 'trash',
          disabled: true,
          scope: this,
          handler: this.deleteHandler
        }, {
          xtype: 'spacer'
        }, {
          id: 'friends-edit-button',
          iconCls: 'compose',
          disabled: true,
          scope: this,
          handler: this.editHandler
        }, {
          xtype: 'spacer'
        }, {
          id: 'friends-request-button',
          iconCls: 'locate',
          disabled: true,
          handler: function() {
              // new twitter.About({}).show();
          }
        }]
      }]
    }, config);
    
    Finder.FriendsList.superclass.constructor.call(this, config);
  },
  
  initEvents: function() {
    this.on('selectionchange', function(list, selections) {
      if (selections.length > 0) {
        Ext.getCmp('friends-edit-button').enable();
        Ext.getCmp('friends-request-button').enable();
        Ext.getCmp('friends-delete-button').enable();
      }
      else {
        Ext.getCmp('friends-edit-button').disable();
        Ext.getCmp('friends-request-button').disable();
        Ext.getCmp('friends-delete-button').disable();
      }
    }, this);
    Finder.FriendsList.superclass.initEvents.apply(this, arguments);
  },
  
  editHandler: function() {
    this.editPanel = this.editPanel || new Finder.FriendsEditPanel();
    this.editPanel.load(this.getSelectedRecords()[0]);
    this.editPanel.show();
  },
  
  addHandler: function() {
    var record = Ext.ModelMgr.create({}, 'Friend');
    
    this.editPanel = this.editPanel || new Finder.FriendsEditPanel();
    this.store.add(record);
    this.editPanel.load(record);
    this.editPanel.show();
  },
  
  deleteHandler: function() {
    // this.store.remove(this.getSelectedRecords()[0]);
    // this.store.sync();
    this.store.proxy.batch({
      destroy: this.getSelectedRecords()
    });
  }
  
  // addFriend: function(record) {
  //   this.store.add(record);
  //   this.store.sync();
  // }
  
});

Ext.reg('finder-friends-list', Finder.FriendsList);