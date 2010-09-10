/*globals Ext Finder */

Ext.ns('Finder');

Finder.FriendsList = Ext.extend(Ext.NestedList, {
  
  constructor: function(config) {
    config = Ext.apply({
      fullscreen: true,
      store: Finder.store,
      displayField: 'handle'
      // tpl: '<tpl for="."><div class="contact"><strong>{name}</strong> {handle}</div></tpl>',
      // itemSelector: 'div.contact',
      // singleSelect: true
      // scroll: 'vertical',
      // dockedItems: [{
      //   dock : 'top',
      //   title: 'Friends',
      //   xtype: 'toolbar',
      //   items: [
      //     {xtype: 'spacer'},
      //     {
      //       text   : 'Add',
      //       iconCls: 'add',
      //       scope  : this,
      //       handler: function() {}
      //   }]
      // }, {
      //   dock: 'bottom',
      //   xtype: 'toolbar',
      //   items: [
      //     {xtype: 'spacer'},
      //     {
      //       text   : 'Send Request',
      //       xtype  : 'button',
      //       handler: function() {
      //           // new twitter.About({}).show();
      //       }
      //     }
      //   ]
      //   }
      // ]
    }, config);
    
    Finder.FriendsList.superclass.constructor.call(this, config);
  },
  
  addFriend: function(record) {
    this.store.add(record);
    this.store.sync();
  }
  
});

Ext.reg('finder-friends-list', Finder.FriendsList);