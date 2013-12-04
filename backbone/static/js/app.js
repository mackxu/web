// 可以添加一个标识来判断显示大图还是小图
var ImageMdl = Backbone.Model.extend({
	defaults: {
		'id': 0,
		'src': '',
		'src_origin': '',
		'intro': ''
	},
	urlRoot: '/api/view',
	initialize: function() {}
});

var ImagesC = Backbone.Collection.extend({
	url: '/api/images',
	model: ImageMdl,
	initialize: function() {
		this.fetch({'reset': true});
	}
});

//============================ 视图 ===========
var ImageItem = Backbone.View.extend({				// 列表中单个的视图, 对应一个模型
	tagName: 'li',
	template: _.template($('#imageItem').html()),
	initialize: function() {
		this.model.on('change', this.render, this);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));		// 用数据渲染模板
		return this;
	}
});

var ImagesView = Backbone.View.extend({				// 图片列表视图， 对应一个集合
	tagName: 'ul',
	className: 'imageList',
	initialize: function() {
		this.collection.on('reset', this.render, this);
	},
	addItem: function(imageMdl) {
		var imageItem = new ImageItem({ model: imageMdl });
		this.$el.append(imageItem.render().el);		// 向列表添加条目
	},
	render: function() {
		this.collection.each(this.addItem, this);
		return this;
	}
});

// 大图展示页面
// 采用不同的模板
// var imageBigItem = Backbone.View.extend({  });

// 创建路由
var App = Backbone.Router.extend({
	routes: {
		'': 'list',
		'view/:id': 'item'
	},
	list: function() {
		var images = new ImagesC();					// 创建集合并请求数据
		var imagesView = new ImagesView({ collection: images });
		$body.html(imagesView.render().el);	// 渲染页面
	},
	item: function(id) {
		var imageMdl = new ImageMdl({id: id});
		var imageItem = new ImageItem({
			el: $body,
			model: imageMdl
		});
		imageMdl.fetch();
	}
});