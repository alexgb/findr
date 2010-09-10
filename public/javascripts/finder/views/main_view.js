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
        type: 'cardslide',
        cover: true
      },
      
      defaults: {
        scroll: 'vertical'
      },
      items: [new Finder.MapPanel(), {
        title: 'Friends',
        xtype: 'finder-friends-list',
        iconCls: 'user',
        badgeText: '3'
      }]
    }, config);
    
    Finder.MainView.superclass.constructor.call(this, config);
  }
  
});