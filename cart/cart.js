
var Cart = new Class;
Cart.include({
	init: function() { 
		 
		 this.stripe();					// 商品的条纹

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
	// 每次删除、加载、更改数量，都应触发
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
		$('.subtotal .cost').text('￥' + totalCost);
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

		$('.total .cost').text('￥' + totalCost);					// 合计
	},
	deleteView: function() {},
	deleteHandle: function() {},
	stripe: function() {
		$('#cart tbody tr:nth-child(odd)').addClass('alt');
	}
});

