App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
	
	Entities.contact = Backbone.Model.extend({
		urlRoot: 'contacts',
		validate: function(attrs, options) {
			var errors = {};
			
			attrs.firstName || ( errors.firstName = "can't be blank" );

			if( !attrs.lastName ) {
				errors.lastName = "can't be blank";
			}else {
				if (attrs.lastName.length < 2) {
					errors.lastName = 'is too short';
				} 
			}

			if(!_.isEmpty(errors)) {
				return errors;
			}
		}
	});

	Entities.contactCollection = Backbone.Collection.extend({
		url: 'contacts',
		model: Entities.contact,
		comparator: function(contact) {
			return contact.get('firstName') + ' ' + contact.get('lastName');
		}
	});

	Entities.Storage(Entities.contact);
	Entities.Storage(Entities.contactCollection);

	var initContactsData = function() {
		var contacts = new Entities.contactCollection([
			{id:1, firstName: 333, lastName: 'aaa', phoneNumber: '5555555'}, 
			{id:3, firstName:222, lastName: 'eee', phoneNumber: '5555555'},
			{id:5, firstName:222, lastName: 'bbb', phoneNumber: '5555555'},
			{id:8, firstName:222, lastName: 'aaa', phoneNumber: '5555555'}
		]);

		contacts.forEach(function(contact, index) {
			contact.save();
		});

		return contacts.models;
	};

	var API = {
		getContactsEntities: function() {
			var defer = $.Deferred();

			var contacts = new Entities.contactCollection();
			contacts.fetch({
				success: function(collection, responce, options) {
					defer.resolve(collection);
				},
				error: function() {
					defer.reject();
				}
			});
			var promise = defer.promise();
			$.when(promise).done(function(contacts) {
				if(contacts.length === 0) {
					var models = initContactsData();
					contacts.reset(models);
				}
			});
			return promise;
		},
		getContactEntity: function(contactid) {
			var defer = $.Deferred();

			var contact = new Entities.contact({		// 创建一个指定id的model
				id: contactid
			});
			setTimeout(function() {
				contact.fetch({
					success: function(data) {
						defer.resolve(data);
					},
					error: function(data) {
						defer.reject(undefined);
					}
				});
			}, 2000);
			return defer.promise();
		}
	};

	// 注册对contact:entities请求的监听
	App.reqres.setHandler('contact:entities', function() {
		return API.getContactsEntities();
	});

	// 请求指定id的contact数据
	App.reqres.setHandler('contact:entity', function(id) {
		return API.getContactEntity(id);
	});
});