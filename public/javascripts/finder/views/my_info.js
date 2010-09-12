/*globals Ext Finder */

Ext.ns('Finder');

Finder.MyInfo = Ext.extend(Ext.form.FormPanel, {
  
  constructor: function(config) {
    config = Ext.apply({
      dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
          text: 'Reset',
          scope: this,
          handler: function() {
            this.reset();
          }
        },{
          xtype: 'spacer'
        },{
          text: 'Save',
          scope: this,
          handler: this.saveHandler
        }]
      }],
      items: [{
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
      }]
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
    
    // this.editPanel = this.editPanel || new Finder.FriendsEditPanel();
    // this.store.add(record);
    // this.editPanel.load(record);
    // this.editPanel.show();
  },
  
  saveHandler: function() {
    console.log(this);
    console.log(this.getRecord());
    var record = this.getRecord();
    record.dirty = true;
    record.set(this.getValues());
    record.store.sync();
  }
  
});

Ext.reg('finder-my-info', Finder.MyInfo);