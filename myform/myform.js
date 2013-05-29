
// 遵循渐进增强原则
// 有必要可以重构
$(document).ready(function() {
	// 增强表单元素的样式
	$('legend').each(function(index) {
		$(this).replaceWith('<h3>' + $(this).text() + '</h3>');
	});

	// 必填字段的提示信息
	var requiredFlag = ' * ';
	var conditionalFlag = ' ** ';

	// 获取文字提示
	var requiredKey = $('input.required:first')
		.next('span').text();
	var conditionalKey = $('input.conditional:first')
		.next('span').text();
	// 原生js方法处理文本：去掉小括号
	requiredKey = requiredFlag + requiredKey.replace(/^\((.+)\)$/, '$1');
	conditionalKey = conditionalFlag + conditionalKey.replace(/^\((.+)\)$/, '$1');
	// 在整个表单前，插入字段提示信息
	$('<p></p>')
		.addClass('field-keys')
		.append(requiredKey + '<br />')
		.append(conditionalKey)
		.insertBefore('fieldset:first');
	// console.log($('fieldset:first'));
	
	// 用图标替换文字
	// 排版习惯 以遍历方法为标准断行
	// 怎样测试呢？
	$('form :input')
		.filter('.required')
			// 添加隐藏和显示事件用于减少重绘的次数
			.next('span').hide().text(requiredFlag).addClass('flag').show().end()
			.prev('label').addClass('req-label').end()
		.end()
		.filter('.conditional')
			.next('span').text(conditionalFlag).addClass('flag');
	
	// 条件文本输入字段，复选框切换
	$('input.conditional')
		// 默认隐藏输入字段和提示文本
		.next('span').andSelf().hide()
		.end().end()
		.each(function() {
			var $thisInput = $(this);
			var $thisFlag = $thisInput.next('span');
			// 为复选框添加click监听事件
			$thisInput.prev('label').find(':checkbox')
			.attr('checked', false)				// 保证复选框初始化为未选中
			.click(function() {
				var $parent_label = $(this).parent('label');
				if (this.checked) {				// 复选框选中时
					$thisInput.addClass('required').show();			// 显示时添加required类
					$thisFlag.show();
					$parent_label.addClass('req-label');
				}else {
					// 先隐藏后移除required类
					// 在用户取消复选框时，移除必填提示
					// 即模拟触发输入框的失焦事件
					$thisInput.hide().blur().removeClass('required');		
					$thisFlag.hide();
					$parent_label.removeClass('req-label');
				}
			}); 
		});

	// 表单验证
	// 当输入框失去焦点时
	$('form :input').blur(function() {

		// 获取父标签li
		var $listItem = $(this).parent('li');
		// 移除错误提示信息
		$listItem.removeClass('warning')
			.find('span.error-msg').remove();

		// 必填字段在失去焦点后检查提示是否为空
		// 但最佳的用户体验不是这样的
		if($(this).hasClass('required')) {			
			// 必填字段 当为隐藏状态时，不提示是否空
			if(!$.trim(this.value).length && !$(this).is(':hidden')) {
				setMessage($listItem, '不能留空');
			}
		}
		if (this.id == 'email') {
			
			if ($(this).is(':hidden')) {
				this.value = '';
			}
			var value = $.trim(this.value);
			// 检查邮箱格式
			var regex = /.+@.+\.[a-zA-Z]{2, 4}$/;
			// 如果填写了邮箱，但格式不正确
			if(value.length && !regex.test(value)) {
				setMessage($listItem, '请输入正确的邮箱');
			}
		}
	});

	// 复选框
	// 初始化时，所有的复选框都未选中
	
	// 添加全(不)选复选框
	$('<li></li>').html('<label><input type="checkbox" id="discover-all" /> <em>全选</em></label>')
	.prependTo('ul#hobbies');
	// 为添加的复选框添加监听事件
	$('#discover-all').click(function() {
		// 获取所有的复选框
		$checkboxes = $(this).parents('ul:first').find(':checkbox');
		$state = $(this).next('em');				// 显示状态文本
		
		// if(this.checked) {							// 如果选中
		// 	$state.text(' 全不选 ');				// 更新文本
		// 	$checkboxes.attr('checked', true);		// 选中所有的复选框
		// }else {										// 全不选
		// 	$state.text(' 全选 ');
		// 	$checkboxes.attr('checked', false);		// 取消选中的复选框
		// }
		var checked = this.checked;
		checked ? $state.text(' 全不选 ') : $state.text(' 全选 ');
		// 由于jquery版本问题，attr()不能正常显示(仅第一次有效)
		// 改进
		$checkboxes.each(function(index, checkbox) {
			checkbox.checked = checked;
		});
	});

	// 最终检查
	$('#contact').submit(function() {

		// 删除过时的提示信息
		$('#submit-message').remove();
		// 自动触发失焦事件 比较.blur()效果
		$('#contact :input.required').trigger('blur');
		var numWarnings = $('.warning', this).length;
		if (numWarnings) {
			// 错误输入框前的标签名
			var list = [];
			$('.warning label').each(function() {
				list.push($(this).text());
			});
			var labels = '&bull;' + list.join('<br />&bull;');
			// 显示所有错误信息
			$('<div></div>')
			.attr({
				'id': 'submit-message',
				'class': 'warning'
			})
			.append('有以下' + numWarnings + '处错误，请修改后再提交:<br />' + labels)
			.insertBefore('#sub');
			return false;				// 如果有错误，阻止默认提交行为
		};
	});
	// 在元素的末尾添加提示信息
	function setMessage($target, msg) {
		$('<span></span>')
			.addClass('error-msg')
			.text(msg)
			.appendTo($target);
		$target.addClass('warning');
	}
	
});