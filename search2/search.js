
	/**
	 * 自动建议控制器
	 * @param {jQuery} oTextbox  搜索框jQuery对象
	 * @param {SuggestionProvider} oProvider 建议提供者
	 */
	function AutoSuggestControl($textbox, oProvider) {
		this.textbox = $textbox;				// 搜索框元素
		this.provider = oProvider;				// 建议提供者

		this.init();
	}
	AutoSuggestControl.prototype.init = function() {
		var oSelf = this;

		this.textbox.keyup(function(oEvent) {
			
			oSelf.handleKeyup(oEvent);

		}).keydown(function(oEvent) {

			oSelf.handleKeydown(oEvent);

		}).blur(function(oEvent) {
			
			// oSelf.hideSuggestions();
			// console.log(oSelf.textbox.val());
			// 如果失去焦点开始请求
			SuggestionProvider.requestSuggestions();
			
		});

		// 下拉建议列表外框，并为其添加监听事件
		this.createDropDown();					
	}
	AutoSuggestControl.prototype.autosuggest = function(aSuggests, bTypeAHead) {
		
	}
	// 创建最外层<div/>
	// 事件委托，监听事件鼠标事件
	// 
	AutoSuggestControl.prototype.createDropDown = function() {
		
	}

	AutoSuggestControl.prototype.handleKeyup = function(oEvent) {
		
	}

	AutoSuggestControl.prototype.handleKeydown = function(oEvent) {
		
	}
	// 隐藏下拉建议列表
	AutoSuggestControl.prototype.hideSuggestions = function() {
		
	}
	// 添加和显示建议
	AutoSuggestControl.prototype.showSuggestions = function(aSuggestions) {
		
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
				console.log(data, stateText);
			}).fail(function(jqXHR, stateText, error) {
				
				console.log(stateText, error);
			});
	}