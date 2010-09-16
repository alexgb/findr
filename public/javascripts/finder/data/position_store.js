/*globals Ext Finder */

Ext.ns('Finder');

Finder.positionStore = new Ext.data.Store({
  model: 'Position',
  proxy: {
    type: 'memory'
    // id: 'finder-position-store'
  },
  autoSave: true
});