var App = new Marionette.Application();

App.addRegions({
	mainRegion: '#main-region',
	membersRegion: '#J_members'
});

App.navigate = function(route, options) {
	options = options || {};
	Backbone.history.navigate(route, options);
};
App.getCurrentRouter = function() {
	return Backbone.history.fragment;
};

// 触发start事件有同样的效果
App.on('initialize:after', function() {
	console.log('initialize: End');
	Backbone.history.start();

	// 设置默认route: #contacts
	if (this.getCurrentRouter() === '') {
		this.trigger('contacts:list');
	}
});