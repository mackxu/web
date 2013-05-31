
	/**
	 * 自动建议控制器
	 * @param {jQuery} oTextbox  搜索框jQuery对象
	 * @param {SuggestionProvider} oProvider 建议提供者
	 */
	function AutoSuggestControl($textbox, oProvider) {
		this.textbox = $textbox;				// 搜索框元素
		this.provider = oProvider;				// 建议提供者
		this.timeoutId = null;					// 计时器id
		this.cur = -1;							// 当前选择的建议项，用于填充字段
		this.layer = null;						// 建议列表的外<div/>, 主要用于隐藏与显示

		this.init();
	}
	AutoSuggestControl.prototype.init = function() {
		var oSelf = this;

		this.textbox.keyup(function(oEvent) {
			
			oSelf.handleKeyup(oEvent);					// 键盘事件，处理能改变文字的键

		}).keydown(function(oEvent) {

			oSelf.handleKeydown(oEvent);				// 键盘事件，处理指定的键

		}).blur(function(oEvent) {						// 当搜索框失去焦点时
			
			oSelf.hideSuggestions();
			
		});

		// 下拉建议列表外框，并为其添加监听事件
		this.createDropDown();					
	}

	// 创建最外层<div/>
	// 事件委托，监听事件鼠标事件
	// 
	AutoSuggestControl.prototype.createDropDown = function() {
		this.layer = $('<div></div>')
			.addClass('suggestions')
			.hide()
			.css('width', this.textbox.width())
			.appendTo('body');
		
		var oSelf = this;

		// 事件委托，监听建议项
		// bind/on/live/delegate
		this.layer.bind('mousedown mouseup mouseover', function(oEvent) {
			
			var $target = $(oEvent.target);					// 目标元素
			// 事件委托，保证目标对象只是建议项
			if ($target.is(oSelf.layer)) { return; };
			
			if (oEvent.type == 'mousedown') {
				oSelf.textbox.val($target.text());			// 填充字段
				oSelf.hideSuggestions();					// 隐藏建议列表
			}else if (oEvent.type == 'mouseover') {
				// 当鼠标在建议项上，高亮建议项
				oSelf.highlightSuggestion($target);
			}else {
				// 文本框重新获得焦点
				oSelf.textbox.focus();
			}
		});
	}
	
	// 处理字符键向服务器请求数据
	AutoSuggestControl.prototype.handleKeyup = function(oEvent) {
		var iKeyCode = oEvent.keyCode;
		oSelf = this;

		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(function() {
			oSelf.provider.requestSuggestions(oSelf, true);
		}, 250);
	}

	AutoSuggestControl.prototype.handleKeydown = function(oEvent) {
		
	}

	// 接收服务器端发来的数据
	// 并决定在页面中显示
	AutoSuggestControl.prototype.autosuggest = function(aSuggests, bTypeAHead) {
		this.cur = -1;				// 每次显示建议前，重置当前指针

		if(aSuggests.length > 0) {

			this.showSuggestions(aSuggests);			// 存在建议项，显示
		}else {											// 否则，
			this.hideSuggestions();						// 隐藏建议列表
		}
	}

	// 隐藏下拉建议列表
	AutoSuggestControl.prototype.hideSuggestions = function() {
		this.layer.hide();
	}
	// 添加和显示建议
	AutoSuggestControl.prototype.showSuggestions = function(aSuggestions) {
		
		this.layer.html('');			// 清空历史数据

		var oSelf = this;

		$.each(aSuggestions, function(index, sSuggestion) {
			$('<div></div>').text(sSuggestion).appendTo(oSelf.layer);
		});

		var oPosition = this.textbox.offset();				// 搜索框坐标
		var iHeight = this.textbox.height();
		// 定位建议列表
		this.layer.css({'left': oPosition.left, 'top': oPosition.top + iHeight});
		// 显示建议列表
		this.layer.show();
	}
	// 高亮建议项
	AutoSuggestControl.prototype.highlightSuggestion = function($suggestion) {
		// 去除之前的高亮项，高亮当前项
		$suggestion.addClass('current').siblings('div').removeClass('current');
	}

	var SuggestionProvider = {};
	SuggestionProvider.oXHR = null;

	// Ajax获取建议，并调用函数显示
	// 静态方法
	SuggestionProvider.requestSuggestions = function(oAutoSuggestControl, bTypeAHead) {
		var oXHR = SuggestionProvider.oXHR;
		// 取消所有进行中的请求
		if (oXHR && oXHR.readyState != 0) {
			oXHR.abort();
		}
		SuggestionProvider.oXHR 
			= $.getJSON('suggestion.php', {})
			.done(function(data, stateText, jqXHR) {
				// console.log(data, stateText);
				// 为控件提供建议
				oAutoSuggestControl.autosuggest(data, bTypeAHead);

			}).fail(function(jqXHR, stateText, error) {
				
				console.log(stateText, error);
			});
	}