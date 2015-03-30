App.module('ContactsApp.List', function(List, App, Backbone, Marionette, $, _) {
	'use strict';

	List.LayoutView = Marionette.LayoutView.extend({
		template: '#contact-list-layout',
		regions: {
			panelRegion: '#panel-region',
			contactsRegion: '#contacts-region'
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: '#contact-list-panel',
		triggers: {
			'click .js-new': 'contact:new'
		}
	});


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
		},
		flash: function(cssClass) {						// 用于显示高亮行数据
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, function() {
				setTimeout(function() {
					$view.toggleClass(cssClass);
				}, 500);
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
		initialize: function() {
			this.listenTo(this.collection, "reset", function(){
          		this.attachHtml = function(collectionView, childView, index){
	            	collectionView.$el.append(childView.el);
	          	}
	        });
		},
		onRenderCollection: function() {
			this.attachHtml = function(collectionView, childView, index) {
				collectionView.$el.prepend(childView.el);
			}
		},
		highlightName: function(e) {
			// 注意与e.target的区别
			$(e.currentTarget).toggleClass('warning');
		}
		
	});
});