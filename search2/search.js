
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

		}).keydown(function(oEvent) {

		}).blur(function(oEvent) {
			self.hideSuggestions();
		});

		this.createDropDown();
	}
	AutoSuggestControl.prototype.autosuggest = function(aSuggests, bTypeAHead) {
		
	}

	AutoSuggestControl.prototype.createDropDown = function() {
		
	}

	// 建议提供者，与从服务器端获取
	function SuggestionProvider(oAutoSuggestControl, bTypeAHead) {

	}