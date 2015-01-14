// 控制器和视图使用相同的模块
// 访问数据用事件
// 与其他控制器交互由路由负责
App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	
	List.Controller = {
		listContacts: function() {
			// 发起对contact:entities的请求
			var contacts = App.request('contact:entities');
			// 用数据填充视图
			var contactsView = new List.Contacts({
				// 视图可以有一些参数 如model、collection、Events and Callback Methods
				collection: contacts
			});

			contactsView.on('itemview:member:delete', function(childView, member) {
				contacts.remove(member);
			});

			// 绘制members结构
			App.membersRegion.show(contactsView);
		},
		showContact: function() {

		}
	};
});