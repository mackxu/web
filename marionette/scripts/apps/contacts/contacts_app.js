App.module('ContactsApp', function(ContactsApp, App, Backbone, Marionette, $, _) {

	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'contacts': 'listContacts',
			'contacts/:id': 'showContact'
		}
	});

	var API = {
		listContacts: function() {
			ContactsApp.List.Controller.listContacts();
			App.execute("set:active:header", "contacts");
		},
		showContact: function(id) {
			ContactsApp.Show.Controller.showContact(id);
			App.execute("set:active:header", "contacts");
		}
	};

	// 程序触发列表视图事件处理函数
	App.on('contacts:list', function() {
		this.navigate('contacts');
		API.listContacts();
	});
	// 程序触发详情视图事件处理函数
	App.on('contact:show', function(id) {
		this.navigate('contacts/' + id);
		API.showContact(id);
	});

	// 通用的加载视图
	App.on('layoutsManager', function() { 
		
		// var AppLayout = Marionette.LayoutView.extend({
		// 	template: '#layoutContainer-template',
		// 	regions: {
		// 		tapsContent: '#j-tapsContent'
		// 	}
		// });

		// var ContentsLayout = Marionette.LayoutView.extend({
		// 	template: '#tapsContent-layout-template',
		// 	regions: {
		// 		friends: '#j-friends',
		// 		recommend: '#j-recommend',
		// 		me: '#j-me'
		// 	}
		// });

		// var RecommendLayout = Marionette.LayoutView.extend({
		// 	template: '#recommend-layout-template',
		// 	regions: {
		// 		search: '#j-search',
		// 		hot: '#j-hot',
		// 		album: '#j-albums'
		// 	}
		// });

		// var SearchView = Marionette.ItemView.extend({
		// 	template: '#search-template'
		// });

		// var appLayout = new AppLayout();
		// var cntLayout = new ContentsLayout(); 
		// var rLayout = new RecommendLayout();

		// var searchView = new SearchView();

		// App.mainRegion.show(appLayout);
		// appLayout.getRegion('tapsContent').show(cntLayout);
		// cntLayout.getRegion('recommend').show(rLayout);
		// rLayout.getRegion('search').show(new SearchView());
		
	})

	// 启动本模块管理的路由
	App.addInitializer(function() {
		new ContactsApp.Router({
			controller: API
		});
		console.log('ContactsApp Router: Init');
	});

});