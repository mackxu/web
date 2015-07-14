// 控制器和视图使用相同的模块
// 访问数据用事件
// 与其他控制器交互由路由负责
App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	
	List.Controller = {
		listContacts: function() {
			
			// 1. 显示加载视图
			var loadingView = new App.Common.Views.Loading();
			App.mainRegion.show(loadingView);

			var contactsListLayout = new List.LayoutView();
			var contactsListPanel = new List.Panel();

			// 发起对contact:entities的请求
			var fetchingContacts = App.request('contact:entities');
			
			$.when(fetchingContacts).done(function(contacts) {
				// 用数据填充视图
				var contactsView = new List.Contacts({
					// 视图可以有一些参数 如model、collection、Events and Callback Methods
					collection: contacts
				});

				contactsView.on('childview:contact:delete', function(childView, args) {
					args.model.destroy();
				});

				contactsView.on('childview:contact:show', function(childView, args) {
					App.trigger('contact:show', args.model.get('id'));
				});

				contactsView.on('childview:contact:edit', function(childView, args) {				// modal type for edit contact 
					var model = args.model;
					var view = new App.ContactsApp.Edit.Contact({
						model: model,
						asModal: true
					});

					view.on('show', function() {
						this.$el.dialog({
							modal: true,
							title: this.title,
							width: 'auto'
						});
					});

					view.on('form:submit', function(data) {
						if(model.save(data)) {
							childView.render();							// 更新列表的itemView
							App.dialogRegion.empty();					// 
							childView.flash('success');
						}else {
							view.triggerMethod('form:data:invalid', model.validationError);
						}
					});

					App.dialogRegion.show(view);
				});

				contactsListPanel.on('contact:new', function() {
					// 创建新contact的model
					var newContact = new App.Entities.contact();
					
					var view = new App.ContactsApp.New.Contact({
						model: newContact,
						asModal: true
					});

					view.on('form:submit', function(data) {
						var highestIdOfModel = contacts.max(function(c) {
							return c.id
						});
						var highestId = highestIdOfModel.get('id');
						data.id = highestId + 1;

						if(newContact.save(data)) {
							contacts.add(newContact);
							App.dialogRegion.empty();
							contactsView.children.findByModel(newContact).flash('success');
						}else {
							view.triggerMethod('form:data:invalid', model.validationError);
						}
					});

					App.dialogRegion.show(view);
				});

				contactsListLayout.on('show', function() {
					this.panelRegion.show(contactsListPanel);
					this.contactsRegion.show(contactsView);
				});

				// 2. show LayoutView后在显示Regions
				App.mainRegion.show(contactsListLayout);
				console.log('list controller: Exec');
			}).fail(function() {
				console.log('Error: fetch list contacts');
			});
			
		}
	};
});