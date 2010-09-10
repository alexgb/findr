/*globals Ext Finder */

Ext.ns('Finder');

Finder.store = new Ext.data.Store({
  model: 'Friend',
  proxy: {
    type: 'localstorage',
    id  : 'finder-friends'
  },
  // autoSave: true,
  autoLoad: true
  // autoLoad: {
  //   scope: this,
  //   callback: function(){console.log('autoloading store');}
  // }//, 
  // // listeners: {
  // //   datachanged: function() {
  // //     console.log('data changing');
  // //   }
  // // } 
});