/*globals Ext Finder */

Ext.ns('Finder');

Finder.FriendsList = Ext.extend(Ext.List, {
  
  constructor: function(config) {
    config = Ext.apply({
      fullscreen: true,
      store: Finder.friendStore,
      tpl: [
        '<tpl for=".">',
          '<div class="contact">',
          '<strong>{name}</strong> {handle}',
            '<tpl if="connected">',
              '<div style="float:right; margin-top: -3px;"><img src="/images/green_indicator.png" /></div>',
            '</tpl>',
          '</div>',
        '</tpl>'
      ],
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
          scope: this,
          handler: this.requestLocationHandler
        }]
      }]
    }, config);
    
    this.editPanel = new Finder.FriendsEditPanel();
    this.editPanel.on('save', this.onEditPanelSave, this);
    
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
    
    // badge numbering events
    this.getStore().on('update', function(store) {
      this.fireEvent('countchanged', store.getCountConnected());
    }, this);
    this.getStore().on('add', function(store) {
      this.fireEvent('countchanged', store.getCountConnected());
    }, this);
    
    // bubble location requests to owner container
    this.enableBubble('locationRequest');
    
    Finder.FriendsList.superclass.initEvents.apply(this, arguments);
  },
  
  /**
   * opens record edit window for selected record
   */
  editHandler: function() {
    this.editPanel = this.editPanel || new Finder.FriendsEditPanel();
    this.editPanel.load(this.getSelectedRecords()[0]);
    this.editPanel.show();
  },
  
  /**
   * adds new record and begins record edit process
   */
  addHandler: function() {
    var record = Ext.ModelMgr.create({}, 'Friend');
    
    this.editPanel = this.editPanel || new Finder.FriendsEditPanel();
    this.editPanel.load(record);
    this.editPanel.show();
  },
  
  /**
   * removes selected record from list
   */
  deleteHandler: function() {
    this.store.remove(this.getSelectedRecords());
    this.store.sync();
  },
  
  requestLocationHandler: function() {
    this.fireEvent('locationRequest', this.getSelectedRecords()[0]);
  },
  
  /**
   * called when the edit panel saves it's record
   */
  onEditPanelSave: function(record) {
    // if it's a new record
    if (record.store !== this.store) {
      this.store.add(record);
    }
    this.store.sync();
  }
  
});

Ext.reg('finder-friends-list', Finder.FriendsList);