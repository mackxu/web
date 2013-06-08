
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
	changeHandle: function() {
		var totalQuantity = 0, 
			totalCost = 0,
			rgTrim = /^[^\d.]*/;		// 匹配开始非数字或.号的字符
		$('#cart tbody tr').each(function() {
			// 单类商品个数、价格、总价
			var price = parseFloat($('.price', this).text().replace(rgTrim, ''));
			price = isNaN(price) ? 0 : price;
			var quantity = parseInt($('.quantity input', this).val(), 10);
			var cost = quantity * price;
			$('.cost', this).text('￥' + cost.toFixed(2));
			// 税费
			// 运费
			// 合计
		});
	},
	deleteView: function() {},
	deleteHandle: function() {},
	stripe: function() {
		$('#cart tbody tr:nth-child(odd)').addClass('alt');
	}
});

