App.module('Common.Views', function(Views, App, Backbone, Marionette, $, _) {
	'use strict';

	// loading of view
	Views.Loading = Marionette.ItemView.extend({
		template: '#loading-view',
		
		initialize: function(options) {
			// var options = options || {};			
			options || (options = {});				// 确保options是对象
			this.title = options.title || 'Loading data';
			this.message = options.message || 'Please wait, data is loading';
		},
		serializeData: function() {					// 把对象序列化为模型，用于渲染模板
			return {
				title: this.title,
				message: this.message
			}
		},
		onShow: function() {						// show event of view 
			$('#j-spinner').spin({
				top: '30px'
			});
		}
	});
});