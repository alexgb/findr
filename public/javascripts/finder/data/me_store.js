/*globals Ext Finder */

Ext.ns('Finder');

Finder.meStore = new Ext.data.Store({
  model: 'Me',
  proxy: {
    type: 'localstorage',
    id  : 'finder-me'
  },
  autoLoad: true
});