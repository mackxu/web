App.module('ContactsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	Show.Controller = {
		showContact: function(id) {
			var loadingView = new App.Common.Views.Loading();
			App.membersRegion.show(loadingView);
			
			var fetchingContact = App.request('contact:entity', id);
			
			$.when(fetchingContact).done(function(contact){
				var contactView;
				
				if(contact !== undefined) {				// 用模型数据填充视图
					contactView = new Show.Contact({
						model: contact
					});
				}else {
					contactView = new Show.MissingContact();
				}
				App.membersRegion.show(contactView);
			}).fail(function() {
				var contactView = new Show.MissingContact();
				App.membersRegion.show(contactView);
				console.log('fail fetch contact: ', id);
			});
			
			console.log('Show Controller exec: ');
		}
	};
});