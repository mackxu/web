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
	}
});

new AppView({ collection: new Todos() });