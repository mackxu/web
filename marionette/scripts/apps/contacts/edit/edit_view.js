App.module('ContactsApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {
	'use strict';
	
	Edit.Contact = App.ContactsApp.Common.Views.Form.extend({
		initialize: function() {
			this.title = 'Edit ' + this.model.get('firstName');
			this.title += ' ' + this.model.get('lastName');
		}
	});

});