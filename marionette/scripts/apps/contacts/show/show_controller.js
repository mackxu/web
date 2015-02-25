App.module('ContactsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	Show.Controller = {
		showContact: function(id) {
			// 显示正在加载loading视图
			var loadingView = new App.Common.Views.Loading({
				title: 'Artificial Loading Delay',
				message: 'Data loading is delayed to demonstrate using a loading view.'
			});

			App.membersRegion.show(loadingView);
			
			var fetchingContact = App.request('contact:entity', id);
			
			$.when(fetchingContact).done(function(contact){
				var contactView;
				
				if(contact !== undefined) {				// 用模型数据填充视图
					contactView = new Show.Contact({
						model: contact
					});
					// 返回联系人列表
					contactView.on('contacts:list', function() {
						App.trigger('contacts:list');
					});

					contactView.on('contact:edit', function(args) {
						// var contactId = args.model.get('id');
						App.trigger('contact:edit', args.model.get('id'));
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