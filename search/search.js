
$(document).ready(function($) {
	$search = $('#search').addClass('overlabel');			// 定位label位置
	
	// $search_input = $search.find('input');
	$search_input = $("#search-text");
	$search_label = $search.find('label');

	// 输入框获得焦点时，隐藏标签文本
	// 当用户没有输入内容失去焦点时，显示标签文本
	$search_input.focus(function() {
		$search_label.hide();
	}).blur(function() {
		if ($.trim(this.value) == '') {
			$search_label.show();
		}
	});
	// 解决当刷新时保留上次输入的文字
	if ($.trim($search_input.val())) {
		// 搜索框中存在文本, 隐藏标签文字
		$search_label.hide();
	};
	// 利用对标签元素的单击来触发输入框的focus事件
	$search_label.click(function() {
		$search_input.trigger('focus');
	});

	// Ajax自动完成
	var timer = null;
	var $autocomplete = $('<ul class="autocomplete"></ul>').hide().insertAfter('#search-text');

	// keydown/keypress 会在当前字符输入前触发
	// keyup 会在字符输入后才触发
	// 关闭内置的自动完成机制
	$search_input.attr('autocomplete', 'off').keyup(function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$.ajax({
				'url': 'autocomplete.php',
				'data': {'s': $search_input.val()},
				'dataType': 'json',
				'type': 'GET',
				'success': autocomplete
			});
		}, 100);
	});
	
	// 自动完成 显示从服务器端获取的数据
	// 设置当前选中项
	function autocomplete(data) {
		if (data.length) {
			$autocomplete.empty();			// 清空历史提示数据
			// 把数据添加到提示ul中
			$.each(data, function(index, item) {
				$('<li></li>').text(item).appendTo($autocomplete)
				.click(function() {
					$search_input.val(item);				// 在输入框显示选中的关键词
					$autocomplete.hide();					// 隐藏关键词列表
				}).mouseover(function() {
					setSelectedItem(index);
				});
			});
			setSelectedItem(0);				// 默认第一项待选中状态
		}else {
			setSelectedItem(null);			// 没有要显示的数据
		}
	}

	// 设置当前选择项
	// 并显示下拉列表
	var selectedItem = null;
	function setSelectedItem(item) {
		selectedItem = item;
		var $lis = $autocomplete.find('li');				// 列表集合
		if (selectedItem === null) {
			$autocomplete.hide();
			return;
		}else if(selectedItem < 0) {
			selectedItem = 0;
		}else if(selectedItem >= $lis.length) {
			selectedItem = $lis.length - 1;
		}
		$lis.removeClass('selected').eq(selectedItem).addClass('selected');
		$autocomplete.show();
	} 
});