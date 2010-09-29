/*globals Ext */

Ext.regModel('Friend', {
  fields: [
    {name: 'id',                    type: 'int'},
    {name: 'name',                  type: 'string'},
    {name: 'handle',                type: 'string'},
    {name: 'position_latitude',     type: 'float'},
    {name: 'position_longitude',    type: 'float'},
    {name: 'response_pending',      type: 'boolean', defaultValue: false},
    {name: 'connected',             type: 'boolean', defaultValue: false}
  ]
});