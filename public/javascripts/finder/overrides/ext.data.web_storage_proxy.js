/*globals Ext */

Ext.override(Ext.data.WebStorageProxy, {
  
  destroy: function(operation, callback, scope) {
      var records = operation.records,
          length  = records.length,
          ids     = this.getIds(),

          
          newIds  = [].concat(ids),
          i;

      for (i = 0; i < length; i++) {
          newIds.remove(String(records[i].getId()));
          this.removeRecord(records[i], false);
      }

      this.setIds(newIds);

      if (typeof callback == 'function') {
          callback.call(scope || this, operation);
      }
  },
  
  removeRecord: function(id, updateIds) {
      if (id instanceof Ext.data.Model) {
          id = id.getId();
      }

      if (updateIds !== false) {
          var ids = this.getIds();
          ids.remove(String(id));
          this.setIds(ids);
      }

      this.getStorageObject().removeItem(this.getRecordKey(id));
  },
  
  setIds: function(ids) {
      var obj = this.getStorageObject(),
          str = ids.join(",");

      if (Ext.isEmpty(str)) {
          obj.removeItem(this.id);
          obj.removeItem(this.getRecordCounterKey());
      } else {
          obj.setItem(this.id,  str);
          obj.setItem(this.getRecordCounterKey(), ids[ids.length - 1]);
      }
  }
  
});