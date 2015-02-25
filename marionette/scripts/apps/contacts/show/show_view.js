App.module('ContactsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	// 详情页视图
	Show.Contact = Marionette.ItemView.extend({
		template: '#contact-show',
		triggers: {
			'click .j-contacts-list': 'contacts:list',
			'click .j-edit': 'contact:edit'
		}
	});

	// 不存在数据时的视图
	Show.MissingContact = Marionette.ItemView.extend({
		template: '#missing-contact-show'
	});
});