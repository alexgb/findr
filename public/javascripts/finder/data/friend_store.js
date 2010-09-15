/*globals Ext Finder */

Ext.ns('Finder');

Finder.FriendStore = Ext.extend(Ext.data.Store, {
  
  /**
   * returns an array of objects with specified properties
   */
  collectRecords : function(properties) {
    var records = [],
        r, length, data, i, j, propLength;
    

    data = this.data.items;
    
    length = data.length;
    propLength = properties.length;
    
    for (i = 0; i < length; i++) {
      r = {};
      for (j = 0; j < propLength; j++) {
        r[properties[j]] = data[i].data[properties[j]];
      }
      records.push(r);
    }
    
    return records;
  }
  
});

Finder.friendStore = new Finder.FriendStore({
  model: 'Friend',
  proxy: {
    type: 'localstorage',
    id  : 'finder-friends'
  },
  autoLoad: true
});