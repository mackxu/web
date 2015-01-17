App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
	
	Entities.contact = Backbone.Model.extend({
		urlRoot: 'contacts'
	});

	Entities.contactsCollection = Backbone.Collection.extend({
		url: 'contacts',
		model: Entities.contact,
		comparator: function(contact) {
			return contact.get('firstName') + ' ' + contact.get('lastName');
		}
	});

	// 注册对contact:entities请求的监听
	App.reqres.setHandler('contact:entities', function(id) {
		return new App.Entities.contactsCollection([
			{id:1, firstName: 333, lastName: 'aaa'}, 
			{id:3, firstName:222, lastName: 'eee'},
			{id:5, firstName:222, lastName: 'bbb'},
			{id:8, firstName:222, lastName: 'aaa'}
		]);
	});
});