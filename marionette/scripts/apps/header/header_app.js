App.module('HeaderApp', function(Header, App, Backbone, Marionette, $, _) {
	// 没有路由

	var API = {
		listHeader: function() {
			Header.List.Controller.listHeader();
		}
	};

	App.commands.setHandler('set:active:header', function(link) {
		// Header.List.Controller.setActiveHeader(link);
	});

	// 初始化菜单
	Header.on('start', function() {
		API.listHeader();
		console.log('Header App: Init.');
	});
})