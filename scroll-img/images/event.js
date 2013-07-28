	
	// 处理事件对象
	var Event = {
		getEvent: function(e) {
			return e || window.event;
		},
		getTarget: function(e) {
			var event = this.getEvent(e);
			return event.target || event.srcElement;
		},
		addEvent: function(elem, evType, callback) {
			if (elem.addEventListener) {
				elem.addEventListener(evType, callback, false);
			}else if(elem.attachEvent) {							
				elem.attachEvent('on'+evType, function(e) {
					callback.call(elem, e);					// this指向元素
				});
			}else {
				elem['on'+evType] = callback;
			}
		},
		// elem, evType, child, data, callback
		// 待解决传递数据
		on: function(elem, evType, child, callback) {
			var length = arguments.length;					// 参数个数
			var callback = arguments[length - 1];			// 事件处理程序
			this.addEvent(elem, evType, function(e) {
				var e = this.getEvent(e);
				if(length >3 && child !== null) {
					this.getTarget(e) === child && callback.call(elem, e);
					var target = this.getTarget(e);
					target.tagName === child.toUppercase() && callback.call(target, e);
				}else {
					callback.call(elem, e);
				} 
			});
		}
	};