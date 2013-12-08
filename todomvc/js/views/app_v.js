var AppView = Backbone.View.extend({
	el: $('#todoapp'),
	template: _.template($('#stats-tmpl').html()),
	events: {
		'keypress #new-todo': 'createOnEnter'
	},
	initialize: function() {
		this.$main = $('#main');
		this.$footer = $('#footer');
		this.$input = $('#new-todo');
		this.$list = $('#todo-list');

		var collection = this.collection;
		collection || console.log('AppView实例化时集合参数');
		this.listenTo(collection, 'add', this.addOne);
		this.listenTo(collection, 'reset', this.addAll);
		this.listenTo(collection, 'all', this.render);				// 无论集合发生任何事件，都会重新渲染该视图

		collection.fetch({ reset: true });				// 获取持久化数据，服务器或本地存储
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
			this.$footer.hide;
		}
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
		if(e.which !== 13) return;
		$input = this.$input;
		var title = $.trim($input.val());
		if(!title) return;
		// 发送POST请求，添加新模型到集合(触发add事件，渲染到视图)
		// 如果失败怎么办？？
		this.collection.create({ title: title }, { 
			wait: true,
			success: function() { 
				console.log('success: add model');
				$input.val(''); 
			},
			error: function() { console.log('error: add model'); } 
		});
	}
});

new AppView({ collection: new Todos() });