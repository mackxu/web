App.module('ContactsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	// 详情页视图
	Show.Contact = Marionette.ItemView.extend({
		template: '#contact-show',
		events: {
			'click #j-contacts-list': 'listContacts'
		},
		listContacts: function(e) {
			e.preventDefault();
			App.trigger('contacts:list');
		}
	});

	// 不存在数据时的视图
	Show.MissingContact = Marionette.ItemView.extend({
		template: '#missing-contact-show'
	});
});