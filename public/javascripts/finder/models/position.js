/*globals Ext */

Ext.regModel('Position', {
  fields: [
    {name: 'id',                  type: 'int'},
    {name: 'friend_handle',       type: 'string'},
    {name: 'accuracy',            type: 'float'},
    {name: 'altitude',            type: 'float'},
    {name: 'altitudeAccuracy',    type: 'float'},
    {name: 'latitude',            type: 'float'},
    {name: 'longitude',           type: 'float'},
    {name: 'speed',               type: 'float'},
    {name: 'created_at',          type: 'date', convert: function(){return new Date();}}                             // store sets this
  ]
});