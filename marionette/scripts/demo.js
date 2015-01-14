
// - - - - - - - - - - - - - - - - - - - -
// 成员详情信息页
// - - - - - - - - - - - - - - - - - - - -

App.memberShow = Marionette.ItemView.extend({
	className: 'member-info',
	template: '#member-show'
});

// - - - - - - - - - - - - - - - - - - - -
// Router
// - - - - - - - - - - - - - - - - - - - -
App.Router = Marionette.AppRouter.extend({
	appRoutes: {
		'contacts': 'listContacts',
		'contacts/:id': 'showContact'
	}
});

App.navigate = function(route, options) {
	options = options || {};
	Backbone.history.navigate(route, options);
};
App.getCurrentRoute = function() {
	return Backbone.history.fragment;
};


App.addInitializer(function() {
	// 实例化路由
	new App.Router({
		controller: App.ContactsApp.List.Controller
	});
});

App.on('contacts:list', function() {
	this.navigate('contacts');
});

App.on('member:show', function() {});

// app start:
App.start();