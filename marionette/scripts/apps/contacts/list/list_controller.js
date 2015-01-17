// 控制器和视图使用相同的模块
// 访问数据用事件
// 与其他控制器交互由路由负责
App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	
	List.Controller = {
		listContacts: function() {
			console.log('list controller exec: ');
			// 发起对contact:entities的请求
			var contacts = App.request('contact:entities');
			// 用数据填充视图
			var contactsView = new List.Contacts({
				// 视图可以有一些参数 如model、collection、Events and Callback Methods
				collection: contacts
			});

			contactsView.on('itemview:contact:delete', function(childView, contact) {
				contacts.remove(contact);
			});

			contactsView.on('itemview:contact:show', function(childView, contact) {
				App.trigger('contact:show', contact.get('id'));
			});

			// 绘制members结构
			App.membersRegion.show(contactsView);
		}
	};
});