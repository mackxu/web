
$(document).ready(function($) {
	$search = $('#search').addClass('overlabel');			// 定位label位置
	
	$search_input = $search.find('input');
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
		console.log('label');
		$search_input.trigger('focus');
	});
});