/*globals Ext Finder */

Ext.ns('Finder');

Finder.FriendsEditPanel = Ext.extend(Ext.form.FormPanel, {
  
  constructor: function(config) {
    config = Ext.apply({
      floating: true,
      centered: true,
      modal: true,
      width: function(){
        var viewWidth = Ext.Element.getViewportWidth();
        return Math.min(viewWidth, 400) - 10;
      }(),
      height: 250,

      dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Editing Item'
      },{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
          text: 'Cancel',
          scope: this,
          handler: function() {
            this.hide();
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
          name: 'name',
          label: 'Name'
        }, {
          xtype: 'textfield',
          name: 'handle',
          label: 'Handle'
        }]
      }]
    }, config);
    
    Finder.FriendsEditPanel.superclass.constructor.call(this, config);
  },
  
  /**
   * fires an event on save that should be handled by object that initiated panel
   */
  saveHandler: function() {
    var record = this.getRecord();
    
    record.dirty = true;
    record.set(this.getValues());
    
    this.fireEvent('save', record);
    this.hide();
  }
  
});