// 图片传送带
$(document).ready(function() {
	// 通过JS修改样式,用于渐进增强
	var spacing = 176;

	$('#featured-books').css({
		'width': spacing * 3,
		'height': 126,
		'overflow': 'hidden'
	}).find('.covers a').css({
		'float': 'none',
		'position': 'absolute',
		'left': 1000
	});

	// 获取最新的图片位置
	// 为前3张图片设定样式
	// 同时为它们添加单击事件
	var setUpCovers = function() {
		var $coversDiv = $('#featured-books .covers');
		var $covers = $coversDiv.find('a');

		$covers.unbind('click');				// 移除所有单击事件的处理函数

		$covers.eq(0)							// 左侧的图片，当单击时图片流向右滚动
			.css('left', 0)
			.click(function(event) {			// 重排图片顺序
				// $covers.eq(2).css('left', 1000);
				// 为图片添加滑移效果
				for(var i=0; i<3; i++) {
					$covers.eq(i).animate({ 'left': (i+1) * spacing }, 'fast');
				}
				$covers.eq($covers.length - 1)
				.css('left', -spacing)
				.animate({'left': 0}, 'fast', function() {
					$(this).prependTo($coversDiv);
					setUpCovers();				// 为重排的图片设定样式，并为显示的图片重新添加事件
				});

				event.preventDefault();
			});
		$covers.eq(2)							// 右边的图片，当被单击时图片流向左滚动
			.css('left', spacing * 2)
			.click(function(event) {
				// 回调函数访问的$covers与外面的不同
				$covers.first()
					.animate({'left': -spacing}, 'fast', function() {
						$(this).appendTo($coversDiv);
						setUpCovers();			// 此时已经重排完成
					})
				.next().animate({'left': 0}, 'fast')
				.next().animate({'left': spacing}, 'fast')
				.next().css('left', spacing * 3)					// 先设定动画的初始位置
					.animate({'left': spacing * 2}, 'fast');		// 向左滑入该图片
				
				event.preventDefault();
			});
		$covers.eq(1)
			.css('left', spacing);
	};// #setUpCovres

	setUpCovers();

});