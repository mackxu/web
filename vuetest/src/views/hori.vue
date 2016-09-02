<style lang="css" scoped>
.wrapper {
	height: 180px; width: 100%;
	overflow: hidden;
	position: relative; top: 0; left: 0;
}
.list {
	position: absolute; top: 0; left: 0; width: 9999px;
	transition: transform .5s; margin: 30px 0;
}
li {
	height: 120px; width: 200px; margin-left: 20px;
	float: left;
	background-color: #009688;
	transition: transform .5s;
}
.focus {
	transform: scale(1.1);
}
</style>
<template>

<div class="wrapper" v-scope:list.hori="changeFocus" :data-focusIndex="focusIndex" data-name="myList">
	<ul class="list" :style="{transform: 'translateX(' + listTop + 'px)'}">
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
  37: -1,
  39: +1
}
export default {
  name: 'component_name-hori',
  data () {
    return {
    	listTop: 0,
    	focusIndex: 1,
    	currentScope: true
    };
  },
  methods: {
  	changeFocus (step, offset) {
  		step && (this.focusIndex += step)
  		offset && (this.listTop += offset)
  	}
  }
}
</script>