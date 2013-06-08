
var Cart = new Class;
Cart.include({
	init: function() { 
		 
		 this.stripe();					// 商品的条纹
		 this.deleteView();				// 删除按钮

		 $('.quantity input')			// 订单变动事件
		 	.keypress($.proxy(this.keypressHandle, this))
		 	.change($.proxy(this.changeHandle, this));
	},
	keypressHandle: function(event) {
		// 拒绝非数字输入
		if(event.which && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
	},
	// 每次删除、加载(服务器计算)、更改数量，都应触发
	changeHandle: function() {
		var totalQuantity = 0, 
			totalCost = 0,
			rgTrim = /^[^\d.]*/;									// 匹配开始非数字或.号的字符
		// 单类商品个数、价格、总价
		$('#cart tbody tr').each(function() {			
			var price = parseFloat($('.price', this).text().replace(rgTrim, ''));
			price = isNaN(price) ? 0 : price;
			var quantity = parseInt($('.quantity input', this).val(), 10);
			var cost = quantity * price;
			$('.cost', this).text('￥' + cost.toFixed(2));
			totalQuantity += quantity;
			totalCost += cost;
		});
		// 所有商品的价格
		$('.subtotal .cost').text('￥' + totalCost.toFixed(2));
		// 税费
		// parseFloat不能理解百分号，只能获取数值
		var taxRate = parseFloat($('.tax .price').text()) / 100;
		// 处理小数点的技巧
		var tax = Math.ceil(totalCost * taxRate * 100) / 100;
		$('.tax .cost').text('￥' + tax.toFixed(2));
		totalCost += tax;											// 加上税费
		// 运费
		$('.shipping .quantity').text(totalQuantity);				// 总商品数
		var shippingRate = parseFloat($('.shipping .price').text().replace(rgTrim, ''));
		var shippingCost = totalQuantity * shippingRate;
		$('.shipping .cost').text('￥' + shippingCost.toFixed(2));
		totalCost += shippingCost;									// 加上运费

		$('.total .cost').text('￥' + totalCost.toFixed(2));		// 合计
	},
	deleteView: function() {
		$('<th>操作</th>').insertAfter('#cart thead th:nth-child(2)');
		$('<td>&nbsp;</td>').insertAfter('#cart tfoot td:nth-child(2)');
		$('#cart tbody tr').each(function() {
			var $deleteButton = $('<a>删除</a>').attr({
				'href': 'javascript:void(0);',
				'class': 'delete'
			});
			$('<td></td>').insertAfter($('td:nth-child(2)', this)).append($deleteButton);
		});
		var that = this;
		// 为删除按钮添加监听事件
		$('#cart').delegate('a.delete', 'click', function(event) {
			$(this).parents('tr')
				.find('td.quantity input').val(0)
				.trigger('change')
				.end().hide();
			that.stripe();
		});

	},
	deleteHandle: function(event) {

	},
	stripe: function() {
		// 清除所有.alt
		$('#cart tbody tr').removeClass('alt')
		.filter(':visible:nth-child(odd)').addClass('alt');
	}
});

