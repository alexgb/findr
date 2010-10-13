var sys = require('sys');

exports.printUsers = function(resource) {
  sys.puts("\033[1;47m    Clients:    \033[0m");
  
  resource.all().forEach(function(r) {
    sys.puts("\033[1;42m  " + r.get(resource.key) + "  \033[0m" + " => ");
    ['name', 'position'].forEach(function(p) {
      var v = r.get(p);
      sys.puts("\t" + p + " => " + sys.inspect(v));
    });
  });
  
};