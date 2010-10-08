var EventEmitter = require('events').EventEmitter,
    sys = require('sys'),
    resource = require('./resource'),
    User;
    

User = resource.createResource();
User.key = 'handle';

exports.User = User;