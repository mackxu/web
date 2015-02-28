App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	'use strict';
	// 列表中当行视图
	List.Contact = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#member-template',
		triggers: {
			'click .js-show': 'contact:show',
			'click .js-edit': 'contact:edit',
			'click .js-delete': 'contact:delete'
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
		childViewContainer: 'tbody', 			// #1
		childView: List.Contact, 				// #2

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