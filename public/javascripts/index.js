/*globals Ext Finder */

Ext.setup({
    icon: 'images/icon.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    phoneStartupScreen: 'images/phone_startup.png',
    glossOnIcon: true,
    onReady: function() {
      
      // get configuration from server then instantiate app
      // not using Ext.Ajax because it was broken
      var req = new XMLHttpRequest();
      req.open("GET", "config.json", true);
      req.onreadystatechange = function() {
        if (req.readyState != 4) return;
        if (req.status === 200) {
          var mainView = new Finder.MainView(JSON.parse(req.responseText));
        }
      };
      req.send();

    }
});