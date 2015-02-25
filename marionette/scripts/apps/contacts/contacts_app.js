App.module('ContactsApp', function(ContactsApp, App, Backbone, Marionette, $, _) {
	'use strict';
	
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'contacts': 'listContacts',
			'contacts/:id': 'showContact',
			'contacts/:id/edit': 'editContact'
		}
	});

	var API = {
		listContacts: function() {
			ContactsApp.List.Controller.listContacts();
			App.execute("set:active:header", "contacts");
		},
		showContact: function(id) {
			ContactsApp.Show.Controller.showContact(id);
			App.execute("set:active:header", "contacts");
		},
		editContact: function(id) {
			ContactsApp.Edit.Controller.editContact(id);
			App.execute("set:active:header", "contacts");
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

	App.on('contact:edit', function(id) {
		this.navigate('contacts/' + id + '/edit');
		API.editContact(id);
	});

	// 启动本模块管理的路由
	App.addInitializer(function() {
		new ContactsApp.Router({
			controller: API
		});
		console.log('ContactsApp Router: Init');
	});

});