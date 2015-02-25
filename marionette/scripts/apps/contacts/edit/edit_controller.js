App.module('ContactsApp.Edit' ,function(Edit, App, Backbone, Marionette, $, _) {
	'use strict';
	Edit.Controller = {
		editContact: function(id) {
			var loadingView = new App.Common.Views.Loading();
			App.membersRegion.show(loadingView);

			// 通过id获取对应的contact
			var fetchingContact = App.request('contact:entity', id);
			$.when(fetchingContact).done(function(contact) {
				var view;
				if (contact !== undefined) {
					view = new Edit.Contact({ model: contact });
					view.on('form:submit', function(data) {
						if(contact.save(data)) {
							// 应该等待数据更新后才跳转的
							App.trigger('contact:show', contact.get('id'));
						}else {
							view.triggerMethod('form:data:invalid', contact.validationError);
						}
						
					});
				}else {
					// 不存在id的contact
					view = App.ContactsApp.Show.MissingContact();
				}

				App.membersRegion.show(view);
			});
		}
	};
});