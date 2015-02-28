// 控制器和视图使用相同的模块
// 访问数据用事件
// 与其他控制器交互由路由负责
App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	
	List.Controller = {
		listContacts: function() {
			
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
						model: model
					});

					view.on('show', function() {
						this.$el.dialog({
							modal: true,
							width: 'auto'
						});
					});

					view.on('form:submit', function(data) {
						if(model.save(data)) {
							childView.render();							// 更新列表的itemView
							App.dialogRegion.close();					// 
						}else {
							view.triggerMethod('form:data:invalid', model.validationError);
						}
					});

					App.dialogRegion.show(view);
				});

				// 绘制members结构
				App.membersRegion.show(contactsView);
				console.log('list controller: Exec');
			}).fail(function() {
				console.log('Error: fetch list contacts');
			});
			
		}
	};
});