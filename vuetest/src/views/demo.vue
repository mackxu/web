<style lang="css" scoped>
.wrapper {
	height: 100%; width: 500px; margin: 0 auto;
	overflow: hidden; padding: 0 20px;
	position: absolute; top: 0; left: 0;
}
.list {
	position: absolute; top: 0; width: 460px;
	transition: transform .5s;
}
li {
	height: 120px; margin-bottom: 20px; background-color: #009688;
	transition: transform .5s;
}
.focus {
	transform: scale(1.2);
}
</style>
<template>

<div class="wrapper" group>
	<ul class="list" :style="{transform: 'translateY(' + listTop + 'px)'}">
		<li focusable :class="{focus: focusIndex === 1}"><a href="#">1 {{ listTop }}</a></li>
		<li focusable :class="{focus: focusIndex === 2}"><a href="#">2</a></li>
		<li focusable :class="{focus: focusIndex === 3}"><a href="#">3</a></li>
		<li focusable :class="{focus: focusIndex === 4}"><a href="#">4</a></li>
		<li focusable :class="{focus: focusIndex === 5}"><a href="#">5</a></li>
		<li focusable :class="{focus: focusIndex === 6}"><a href="#">6</a></li>
		<li focusable :class="{focus: focusIndex === 7}"><a href="#">7</a></li>
		<li focusable :class="{focus: focusIndex === 8}"><a href="#">8</a></li>
		<li focusable :class="{focus: focusIndex === 9}"><a href="#">9</a></li>
	</ul>
</div>
</template>

<script>
let keyMap = {
  38: -1,
  40: +1
}
export default {

  name: 'component_name-demo',

  data () {
    return {
    	listTop: 0,
    	focusIndex: 1,
    	currentScope: true
    };
  },
  events: {
  	changeFocus (which) {
  		let keyType = keyMap[which]
  		if (!keyType) {
  			return false
  		}
  		if(this.focusIndex + keyType < 1 || this.focusIndex + keyType > 9) {
  			return false
  		}
  		this.focusIndex += keyType
  		this.scroll(which)
  	}
  },
  methods: {
  	scroll () {
  		let focusEl = this._allFocus[this.focusIndex - 1]				// 获取获焦元素
  		let rect = focusEl.getBoundingClientRect()							// 元素在视口中的位置
  		if( rect.bottom > this._viewRect.bottom) {							// 底部越界
  			this.listTop -= this.getElementSize(focusEl)
  		}
  		if(rect.top < this._viewRect.top) {											// 头部越界
  			this.listTop += this.getElementSize(focusEl)
  		}
  	},
  	getElementSize (el) {
  		let style = window.getComputedStyle(el)
  		return parseFloat(style.height) + parseFloat(style.marginBottom) / 2
  	}
  },
  ready () {
  	this._allFocus = this.$el.querySelectorAll('[focusable]')
  	this._viewRect = this.$el.getBoundingClientRect()					// scope 视口
  	console.log(this._viewRect)
  }
};
</script>