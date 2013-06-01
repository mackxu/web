
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
		this.searchText = '';					// 发送ajax请求时，用户输入的文本

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
			.css('width', this.textbox.outerWidth())
			.appendTo('body');
		
		var oSelf = this;

		// 事件委托，监听建议项
		// bind/on/live/delegate
		// this.layer.bind('mousedown mouseup mouseover', function(oEvent) {
			
		// 	var $target = $(oEvent.target);					// 目标元素
		// 	// 事件委托，保证目标对象只是建议项
		// 	if ($target.is(oSelf.layer)) { return; };
			
		// 	if (oEvent.type == 'mousedown') {
		// 		oSelf.textbox.val($target.text());			// 填充字段
		// 		oSelf.hideSuggestions();					// 隐藏建议列表
		// 	}else if (oEvent.type == 'mouseover') {
		// 		// 当鼠标在建议项上，高亮建议项
		// 		oSelf.highlightSuggestion($target);
		// 	}else {
		// 		// 文本框重新获得焦点
		// 		oSelf.textbox.focus();
		// 	}
		// });
		this.layer.delegate('div', {
			'mousedown': function(oEvent) {
				oSelf.textbox.val($(this).text());			// 填充字段
				oSelf.hideSuggestions();					// 隐藏建议列表
			},
			'mouseover': function(oEvent) {					// 鼠标在建议项上移动
				// 没有参数的index()返回在同辈元素中的位置
				oSelf.cur = $(this).index();				// 记录鼠标所在建议项的位置
				oSelf.highlightSuggestion($(this));			// 并高亮这个建议项
				console.log(oSelf.cur);
			},
			'mouseup': function(oEvent) {
				// 文本框重新获得焦点
				oSelf.textbox.focus();
			}
		});
	}
	
	// 处理字符键向服务器请求数据
	AutoSuggestControl.prototype.handleKeyup = function(oEvent) {
		var iKeyCode = oEvent.keyCode;
		this.searchText = this.textbox.val();				// 向服务器发送的文本
		oSelf = this;

		clearTimeout(this.timeoutId);

		if (iKeyCode ==8 || iKeyCode == 46) {				// 处理删除键和退格键
			this.timeoutId = setTimeout(function() {
				oSelf.provider.requestSuggestions(oSelf, false);
			}, 250);
		}else if((iKeyCode!=16 && iKeyCode<32) || (iKeyCode>32 && iKeyCode<46)
				|| (iKeyCode>=112 && iKeyCode<=123)) {
			// 32 空格键
			// do nothing
		}else {												// 排除了非字符键后
			this.timeoutId = setTimeout(function() {
				oSelf.provider.requestSuggestions(oSelf, true);
			}, 250);
		}		
	}
	// 用于处理上箭头、下箭头、Esc、回车键
	// 处理键盘事件一种技巧
	AutoSuggestControl.prototype.handleKeydown = function(oEvent) {
		switch(oEvent.keyCode) {
			case 38: 	// 上箭头
				this.goToSuggestion(-1);					// 选择前一个建议
				break;
			case 40: 	// 下箭头
				this.goToSuggestion(1);						// 选中下一个建议
				break;
			case 27: 	// Esc
				this.textbox.val(this.searchText);			// 清除补充的文本
				// 将光标放在用户输入文本的后面，等待继续输入

			case 13: 	// 回车键
				this.hideSuggestions();						// 隐藏下拉建议
				oEvent.preventDefault();					// 取消默认行为
		}
	}

	AutoSuggestControl.prototype.goToSuggestion = function(iDiff) {
		var $suggestions = this.layer.children('div');		// 所有建议项集合
		// 跟踪this.cur的值
		console.log(this.cur);
		if ($suggestions.length > 0) {
			var $suggestion = null;
			if (iDiff > 0) {								// 处理下箭头事件
				if (this.cur < $suggestions.length-1) {		// 确保最大边界
					$suggestion = $suggestions.eq(++this.cur);
				}
			}else {											// 上箭头事件
				if (this.cur > 0) {							// 确保最小边界
					$suggestion = $suggestions.eq(--this.cur);
				}
			}
			if ($suggestion) {								// 使用键盘，当前选中的建议项
				this.highlightSuggestion($suggestion);		// 高亮当前选中
				this.textbox.val($suggestion.text());		// 填充字段
			}
		}

	}

	// 接收服务器端发来的数据
	// 并决定在页面中显示
	AutoSuggestControl.prototype.autosuggest = function(aSuggests, bTypeAHead) {
		this.cur = -1;										// 每次显示建议前，重置当前指针

		if(aSuggests.length > 0) {							// 存在建议项

			this.showSuggestions(aSuggests);				// 显示
		}else {												// 否则，
			this.hideSuggestions();							// 隐藏建议列表
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
		var iHeight = this.textbox.outerHeight();
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

	//------------------------------ class SuggestionProvider ------------------
	var SuggestionProvider = {};
	SuggestionProvider.oXHR = null;

	// Ajax获取建议，并调用函数显示
	// 静态方法
	SuggestionProvider.requestSuggestions = function(oAutoSuggestControl, bTypeAHead) {
		var oXHR = SuggestionProvider.oXHR;
		// 当建立新的请求时，取消所有进行中的请求
		if (oXHR && oXHR.readyState != 0) {
			oXHR.abort();
		}
		SuggestionProvider.oXHR 
			= $.getJSON('suggestion.php', {'s': oAutoSuggestControl.searchText})
			.done(function(data, stateText, jqXHR) {
				// 为控件提供建议
				oAutoSuggestControl.autosuggest(data, bTypeAHead);

			}).fail(function(jqXHR, stateText, error) {
				// 请求错误时提示
				console.error(stateText+ ': '+error);
			});
	}