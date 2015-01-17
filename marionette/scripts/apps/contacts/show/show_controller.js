App.module('ContactsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	Show.Controller = {
		showContact: function(id) {
			console.log('Show Controller exec: ');
			var contacts = App.request('contact:entities');
			var contact = contacts.get(id);

			var contactView;
			if(contact !== undefined) {
				// 用模型数据填充视图
				contactView = new Show.Contact({
					model: contact
				});
			}else {
				contactView = new Show.MissingContact();
			}

			App.membersRegion.show(contactView);
		}
	};
});