var exec = require('child_process').exec;

var settings = {};

/**
 * email
 */ 
exports.send = function(message_opts) {
  var options = "",
      o;
   
  // gather options   
  for (o in message_opts) {
    options += ' --' + o + ' "' + message_opts[o] + '"';
  }
  
  // gather settings
  for (o in settings) {
    options += ' --' + o + ' "' + settings[o] + '"';
  }
  
  exec("ruby bin/sendmail.rb" + options, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};

/**
 * setup
 */
exports.setup = function(config) {
  settings = config;
};