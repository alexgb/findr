/*globals Ext Finder */

Ext.setup({
    // icon: 'icon.png',
    // tabletStartupScreen: 'tablet_startup.png',
    // phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
      var mainView = new Finder.MainView();
    }
});