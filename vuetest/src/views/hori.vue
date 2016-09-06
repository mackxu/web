<style lang="css" scoped>
.wrapper {
	height: 180px; width: 100%;
	overflow: hidden;
	position: relative; top: 0; left: 0;
}
.list {
	position: absolute; top: 0; left: 0; width: 9999px;
	transition: transform .5s cubic-bezier(.17,.67,.83,.67); margin: 30px 0;
}
li {
	padding: 0 10px;
	float: left;
}
a {
	display: block;
	height: 120px;
	width: 200px;
	background-color: #009688;
	transition: transform .5s;
}
.current-scope .focus a {
	transform: scale(1.1);
	background-color: #f00;
}
</style>
<template>

<div group class="wrapper"
	v-scope:list.hori="items"
	:class="{ 'current-scope': currentScope }"
	:data-focus-index="focusIndex"
	:data-offset="listTop"
	:data-current-scope="currentScope"
	>
	<ul class="list" :style="{transform: 'translateX(' + listTop + 'px)'}">
		<li focusable v-for="item in items" :class="{focus: focusIndex === $index}">
			<a href="#">{{$index}}</a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
  name: 'component_name-hori',
  props: {
  	currentScope: {
  		type: Boolean,
  		default: false
  	},
  	items: {
  		type: Array,
  		default: () => {
  			return []
  		}
  	},
  	scopeName: {
  		type: String
  	}
  },
  data () {
    return {
    	listTop: 0,
    	focusIndex: 0
    }
  },
  events: {
  	updateFocus (step) {
  		this.focusIndex += step
  	},
  	updateXOffset (offset) {
  		this.listTop = offset
  	}
  },
  methods: {
  	changeFocus (step, offset) {
  		step && (this.focusIndex += step)
  		if(offset) {
  			this.focusIndex === 0 ? (this.listTop = 0) : (this.listTop = offset)
  			// console.log(this.listTop)
  		}

  	}
  }
}
</script>