
(function() {

	// 原生JS实现无缝滚动
	var scroll = {
		init: function() {
			this.scrollDiv = this.getByClassName('scroll')[0];
			this.images = this.getByClassName('images', this.scrollDiv)[0];
			// 这个是动画的关键，当其重置left值时，不会出现闪屏现象
			this.images.innerHTML += this.images.innerHTML;		

			this.startLeft = 0;									// 动画开始的起点
			this.endLeft = -960;								// 动画向左移动的最大长度
			this.animateLeft = 0;								// 实时记录动画移动长度
			this.speed = 2;										// 动画的速度

			this.timer = setTimeout(this.proxy(this.imgScroll, this), 25);
			
			// 添加事件
			this.images.onmouseover = this.proxy(this.mouseoverHandler, this);
			this.images.onmouseout = this.proxy(this.mouseoutHandler, this);
			
		},
		// 实现图片的无限滚动
		imgScroll: function() {
			var that = this;

			if (this.animateLeft <= this.endLeft) {				// 当图片滚动到最大长度时
				this.animateLeft = 0;							
				this.images.style.left = this.startLeft + 'px';	// 把其left值重置
			}

			this.timer = setTimeout(function() {
								
				that.animateLeft -= that.speed;
				that.images.style.left = that.animateLeft + 'px';																	

				that.timer = setTimeout(that.proxy(that.imgScroll, that), 25);
			}, 25);
		},
		mouseoverHandler: function() {
			clearTimeout(this.timer);
		},
		mouseoutHandler: function() {
			this.timer = setTimeout(this.proxy(this.imgScroll, this), 25);
		},
		$: function(id) {
			return id ? document.getElementById(id) : ''
		},
		getByClassName: function(classname, parent) {
			if (document.getElementsByClassName) {
				var elem = parent || document;
				return elem.getElementsByClassName(classname);
			}
			return '';
		},
		proxy: function(fn, context) {
			return function() {
				return fn.apply(context, arguments);
			}
		}

	};
	window.onload = function() {
		scroll.init();
	}

})();

