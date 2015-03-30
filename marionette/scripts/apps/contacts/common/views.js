App.module('ContactsApp.Common.Views', function(Views, App, Backbone, Marionette, $, _) {
	// 用于Contact new and edit 继承
	Views.Form = Marionette.ItemView.extend({
		template: '#contact-form',
		events: {
			'click .js-submit': 'submitClicked'
		},
		submitClicked: function(e) {
			e.preventDefault();
			var formData = Backbone.Syphon.serialize(this);
			this.trigger('form:submit', formData);
		},
		onRender: function() {
			if(!this.options.asModal) {
				this.$el.prepend($('<h1>', { text: this.title }));
			}
		},
		onShow: function() {
			if(this.options.asModal) {
				this.$el.dialog({
					modal: true,
					title: this.title,
					width: 'auto'
				});
			}
		},
		onFormDataInvalid: function(errors) {
			// 处理错误消息的
			console.log(errors);
		}
	});
});