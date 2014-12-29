// Application:
var App = new Marionette.Application();

App.addRegions({
	mainRegion: '#main-region',
	membersRegion: '#J_members'
});

// 创建member的model类
App.mMember = Backbone.Model.extend({});

// 创建member的集合类
App.cMembers = Backbone.Collection.extend({
	model: App.mMember,
	// Sorting a Collection with a Function
	comparator: function(member) {
		// 加空格的用处？
		// return member.get('firstName') + member.get('lastName');
		return member.get('firstName') + ' ' + member.get('lastName');
	}					
});

// 创建单个成员的视图类
App.memberView = Marionette.ItemView.extend({
	tagName: 'tr',
	template: '#member-template',

	events: {
		'click .js-show': 'onShowMember',
		'click .js-delete': 'onDeleteMember',
		'click': 'onPrintInfo'
	},
	onShowMember: function() {
		// this.trigger('member:show', this.model);
	},
	onDeleteMember: function() {
		// 从集合中删除model，视图也会被删除
		// this.model.collection.remove(this.model);
		// 视图只用来显示，不应该担任删除数据的角色，应在Controller中处理
		this.trigger('member:delete', this.model);
	},
	onPrintInfo: function() {
		// 由于该事件只用来显示，所以无需在控制器内执行
		// console.log('clicked: ', this.model);
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

// 合成视图CompositeView
App.membersView = Marionette.CompositeView.extend({
	tagName: 'table',
	className: 'table table-hover',
	template: '#member-list',
	itemViewContainer: 'tbody', 			// #1
	itemView: App.memberView, 				// #2

	events: {
		'click tr': 'highlightName'
	},
	highlightName: function(e) {
		// 注意与e.target的区别
		$(e.currentTarget).toggleClass('warning');
	}
});

// - - - - - - - - - - - - - - - - - - - -
// 成员详情信息页
// - - - - - - - - - - - - - - - - - - - -

App.memberShow = Marionette.ItemView.extend({
	className: 'member-info',
	template: '#member-show'
});

// - - - - - - - - - - - - - - - - - - - -
// Router
// - - - - - - - - - - - - - - - - - - - -
App.Router = Marionette.AppRouter.extend({
	appRoutes: {
		'members': 'membersList',
		'members/:id': 'memberShow'
	}
});

App.navigate = function(route, options) {
	options = options || {};
	Backbone.history.navigate(route, options);
};
App.getCurrentRoute = function() {
	return Backbone.history.fragment;
};

// 创建一个集合对象
var cMembers = new App.cMembers([
	{id:1, firstName: 333, lastName: 'aaa'}, 
	{id:3, firstName:222, lastName: 'eee'},
	{id:5, firstName:222, lastName: 'bbb'},
	{id:8, firstName:222, lastName: 'aaa'}
]);

// 可以把API当作控制器
var API = {
	membersList: function() {
		// 集合与视图结合
		var membersView = new App.membersView({
			// 视图可以有一些参数 如model、collection、Events and Callback Methods
			collection: cMembers
		});

		membersView.on('itemview:member:delete', function(childView, member) {
			cMembers.remove(member);
		});

		// 绘制members结构
		App.membersRegion.show(membersView);
	},
	memberShow: function(id) {
		// 根据id获取model
		var member = cMembers.get(id);
		// view and data
		var memberShow = new App.memberShow({ model: member });
		// diaplay
		App.membersRegion.show(memberShow);
	}
};

App.addInitializer(function() {
	// 实例化路由
	new App.Router({
		controller: API
	});
});

App.on('members:list', function() {
	this.navigate('members');
	API.membersList();
});

App.on('member:show', function() {});

// 触发start事件有同样的效果
App.on('initialize:after', function() {
	Backbone.history.start();

	// 设置默认route: #members
	if (this.getCurrentRoute() === '') {
		this.trigger('members:list');
	}
});

// app start:
App.start();