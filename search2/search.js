
	/**
	 * 自动建议控制器
	 * @param {jQuery} oTextbox  搜索框jQuery对象
	 * @param {SuggestionProvider} oProvider 建议提供者
	 */
	function AutoSuggestControl(oTextbox, oProvider) {
		this.Textbox = oTextbox;				// 搜索框元素
		this.Provider = oProvider;				// 建议提供者
	}
	AutoSuggestControl.prototype.init = function() {
		var self = this;

		this.Textbox.keyup(function(oEvent) {
			
			self.handleKeyup(oEvent);

		}).keydown(function(oEvent) {

			self.handleKeydown(oEvent);

		}).blur(function(oEvent) {
			
			self.hideSuggestions();
			
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

	// Ajax获取建议，并调用函数显示
	// 静态方法
	SuggestionProvider.requestSuggestions = function(oAutoSuggestControl, bTypeAHead) {

	}