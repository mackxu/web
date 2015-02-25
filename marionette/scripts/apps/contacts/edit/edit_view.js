App.module('ContactsApp.Edit' ,function(Edit, App, Backbone, Marionette, $, _) {
	'use strict';
	
	Edit.Contact = Marionette.ItemView.extend({
		template: '#contact-form',
		events: {
			'click .js-submit': 'submitClicked'
		},
		submitClicked: function(e) {
			e.preventDefault();
			var formData = Backbone.Syphon.serialize(this);
			this.trigger('form:submit', formData);
			// console.log('edit contact');
		},
		onFormDataInvalid: function(errors) {
			// 处理错误消息的
			console.log(errors);
		}
	});

});