App.module('Common.Views', function(Views, App, Backbone, Marionette, $, _) {
	'use strict';

	Views.Loading = Marionette.ItemView.extend({
		template: '#loading-view',
		
		initialize: function(options) {
			var options = options || {};			// 确保options是对象
			this.title = options.title || 'Loading data';
			this.message = options.message || 'Please wait, data is loading';
		},
		serializeData: function() {
			return {
				title: this.title,
				message: this.message
			}
		},
		onShow: function() {
			$('#j-spinner').spin({
				top: '30px'
			});
		}
	});
});