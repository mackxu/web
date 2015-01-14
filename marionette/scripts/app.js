var App = new Marionette.Application();

App.addRegions({
	mainRegion: '#main-region',
	membersRegion: '#J_members'
});

// 触发start事件有同样的效果
App.on('initialize:after', function() {
	Backbone.history.start();

	// 设置默认route: #contacts
	if (this.getCurrentRoute() === '') {
		this.trigger('contacts:list');
	}
});