App.module('ContactsApp', function(ContactsApp, App, Backbone, Marionette, $, _) {

	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'contacts': 'listContacts',
			'contacts/:id': 'showContact'
		}
	});

	var API = {
		listContacts: function() {
			ContactsApp.List.Controller.listContacts();
		},
		showContact: function(id) {
			ContactsApp.Show.Controller.showContact(id);
		}
	};

	// 程序触发列表视图事件处理函数
	App.on('contacts:list', function() {
		this.navigate('contacts');
		API.listContacts();
	});
	// 程序触发详情视图事件处理函数
	App.on('contact:show', function(id) {
		this.navigate('contacts/' + id);
		API.showContact(id);
	});

	// 启动本模块管理的路由
	App.addInitializer(function() {
		new ContactsApp.Router({
			controller: API
		});
		console.log('ContactsApp Router: Init');
	});

});