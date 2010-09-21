/*globals Ext Finder */

Ext.ns('Finder');

Finder.MyInfo = Ext.extend(Ext.form.FormPanel, {
  
  constructor: function(config) {
    config = Ext.apply({
      items: [{
        html: '<div class="x-html"><p>Provide a name and handle (currently only supports email address) to identify yourself.</p></div>'
      },{
        xtype: 'fieldset',
        items: [{
          xtype: 'textfield',
          name : 'name',
          label: 'Name'
        }, {
          xtype: 'textfield',
          name : 'handle',
          label: 'Handle'
        }]
      }],
      dockedItems: [{
        dock : 'top',
        title: 'My Info',
        xtype: 'toolbar'
      }],
      listeners: {
        deactivate: this.saveHandler
      }
    }, config);
    
    Finder.MyInfo.superclass.constructor.call(this, config);
    this.initializeRecord();
  },
  
  initializeRecord: function() {
    var record = Finder.meStore.getAt(0) || Ext.ModelMgr.create({}, 'Friend');
    
    if (!record.store) {
      Finder.meStore.add(record);
    }
    
    this.load(record);
  },
  
  saveHandler: function() {
    var record = this.getRecord();
    record.dirty = true;
    record.set(this.getValues());
    record.store.sync();
    this.fireEvent('update', record);
  }
  
});

Ext.reg('finder-my-info', Finder.MyInfo);