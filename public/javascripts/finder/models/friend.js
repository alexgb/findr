/*globals Ext */

Ext.regModel('Friend', {
  fields: [
    {name: 'id',      type: 'int'},
    {name: 'name',    type: 'string'},
    {name: 'handle',  type: 'string'},
    {name: 'response_pending',   type: 'boolean', defaultValue: false}
  ]
});