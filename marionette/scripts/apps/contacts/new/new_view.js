App.module('ContactsApp.New' ,function(New, App, Backbone, Marionette, $, _) {
	'use strict';
	
	New.Contact = App.ContactsApp.Common.Views.Form.extend({
		initialize: function() {
			this.title = 'New Contact';
		}
	});

});
