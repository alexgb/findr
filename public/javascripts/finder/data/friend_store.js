/*globals Ext Finder */

Ext.ns('Finder');

Finder.friendStore = new Ext.data.Store({
  model: 'Friend',
  proxy: {
    type: 'localstorage',
    id  : 'finder-friends'
  },
  autoLoad: true
});