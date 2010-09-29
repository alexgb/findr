/*globals Ext Finder */

Ext.setup({
    icon: 'images/icon.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    phoneStartupScreen: 'images/phone_startup.png',
    glossOnIcon: true,
    onReady: function() {
      var mainView = new Finder.MainView();
      
      //debug
      window.mainView = mainView;
    }
});