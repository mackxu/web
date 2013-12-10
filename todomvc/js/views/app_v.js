var AppView = Backbone.View.extend({
	
	el: $('#todoapp'),
	template: _.template($('#stats-tmpl').html()),
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearDone',
		'click #toggle-all': 'toggleAllDone',
		'click .filter': 'filters'
	},
	initialize: function() {
		this.$main = $('#main');
		this.$footer = $('#footer');
		this.$input = $('#new-todo');
		this.$list = $('#todo-list');
		this.allCheckbox = this.$('#toggle-all')[0];

		var collection = this.collection;
		collection || console.log('AppView实例化时集合参数');
		this.listenTo(collection, 'add', this.addOne);
		this.listenTo(collection, 'reset', this.addAll);
		// 无论集合发生任何事件，都会重新渲染该视图
		// 记住，渲染的不是集合对应的列表，而是集合的统计视图
		this.listenTo(collection, 'all', this.render);				

		collection.fetch({ reset: true });							// 获取持久化数据，服务器或本地存储
	},
	render: function() {
		var collection = this.collection;
		var done = collection.done().length;
		var remaining = collection.remaining().length;

		if(collection.length) {
			this.$main.show();
			this.$footer.html(this.template({ done: done, remaining: remaining })).show();
		}else {
			this.$main.hide();
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;
	},
	addOne: function(todoMdl) {
		var todoItem = new TodoItem({ model: todoMdl });
		// 待优化，在头部加入
		this.$list.append(todoItem.render().el);
	},
	addAll: function() {
		this.collection.each(this.addOne, this);
	},
	createOnEnter: function(e) {
		var $input = this.$input;
		if(event.which !== 13 || !$.trim($input.val())) {
			return;
		}
		// 发送POST请求，添加新模型到集合(触发add事件，渲染到视图)
		// 注意create与add的区别
		this.collection.create({
			title: $.trim($input.val()),
			done: false,
			order: this.collection.nextOrder()
		}, { 
			wait: true,
			success: function() { console.log('success: add model'); $input.val(''); },
			error: function() { console.log('error: add model'); } 
		});
	},
	// 一键删除所有完成事件
	clearDone: function() {
		_.invoke(this.collection.done(), 'destroy');
		return false;
	},
	// 全部标记完成
	toggleAllDone: function() {
		var done = this.allCheckbox.checked;
		// 记住: 不能用_.each()来直接遍历集合
		this.collection.each(function(todo) {
			todo.save({'done': done});							// localStorage不支持patch请求
		});
	},
	filters: function(event) {
		var self = this;
		this.filterList = ['all', 'active', 'completed'];
		var filter = $(event.currentTarget);
		var filterName = '_filters_' + event.currentTarget.getAttribute('data-filter');
		// 在此处查找元素，而不是在initialize()，是因为初始化时，视图未渲染，找不到DOM元素
		// 这里是很多时候会犯的错误,因此当你找不要节点时，可以想想是不是在渲染前做了查找
		this.$list.find('li').each(function(index, item) {
			self[filterName].call(self, $(item));
		});
		return false;
	},
	_filters_all: function($item) {
		$item.removeClass('hidden');
	},
	_filters_active: function($item) {
		$item.toggleClass('hidden', $item.hasClass('done'));
	},
	_filters_completed: function($item) {
		$item.toggleClass('hidden', !$item.hasClass('done'));
	}

});

new AppView({ collection: new Todos() });