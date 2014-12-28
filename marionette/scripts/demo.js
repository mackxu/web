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
		this.trigger('member:show', this.model);
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
	tagName: 'h1',
	template: '#member-show'
});

// 触发start事件有同样的效果
App.on('initialize:after', function() {
	// 模型
	var mMember = new App.mMember({
		lastName: 'Zhang'
	});
	// 创建一个集合实例
	var cMembers = new App.cMembers([
		{firstName: 333, lastName: 'aaa'}, 
		{firstName:222, lastName: 'eee'},
		{firstName:222, lastName: 'bbb'},
		{firstName:222, lastName: 'aaa'}
	]);

	// 集合与视图结合
	var membersView = new App.membersView({
		// 视图可以有一些参数 如model、collection、Events and Callback Methods
		collection: cMembers
		// model: mMember
	});

	membersView.on('itemview:member:show', function(childView, member) {
		// 通过router调用详情页控制器
		console.log('show: ', member);

		// 获取视图对象并显示
		var memberShow = new App.memberShow({
			model: member
		});
		App.membersRegion.show(memberShow);
	});

	membersView.on('itemview:member:delete', function(childView, member) {
		cMembers.remove(member);
	});

	// 绘制members结构
	App.membersRegion.show(membersView);

});
// app start:
App.start();