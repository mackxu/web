App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	// 列表中当行视图
	List.Contact = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#member-template',

		events: {
			'click .js-show': 'showContact',
			'click .js-delete': 'deleteContact',
			'click': 'onPrintInfo'
		},
		showContact: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger('contact:show', this.model);
		},
		deleteContact: function() {
			// 从集合中删除model，视图也会被删除
			// this.model.collection.remove(this.model);
			// 视图只用来显示，不应该担任处理数据的角色，应在Controller中处理
			this.trigger('contact:delete', this.model);
		},
		remove: function() {
			// 覆盖默认remove
			var self = this;
			self.$el.fadeOut(500, function() {
				// self === view
				Marionette.ItemView.prototype.remove.call(self);
			});
		}
	});

	// 列表视图
	List.Contacts = Marionette.CompositeView.extend({
		tagName: 'table',
		className: 'table table-hover',
		template: '#member-list',
		itemViewContainer: 'tbody', 			// #1
		itemView: List.Contact, 				// #2

		events: {
			'click tr': 'highlightName'
		},
		highlightName: function(e) {
			// 注意与e.target的区别
			$(e.currentTarget).toggleClass('warning');
		},
		onItemviewContactDelete: function(childView, model) {
			// 可用于监听child view事件
			console.log(childView, model);
		}
	});
});