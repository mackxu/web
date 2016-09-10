<style lang="css" scoped>
.wrapper { height: 100%; width: 100%; overflow: hidden; }

.vertical-list {
	position: absolute; top: 0;
  transition: transform .5s;
  width: 100%;
  height: 9999px;
}
li {
	padding: 5px 20px;
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
	<div class="wrapper"
    v-scope.vert="items"
    :class="{ 'current-scope': currentScope }"
    :data-current-scope="currentScope">
		<ul class="container vertical-list" :style="{transform: 'translateY('+ offset +'px)'}">
			<li focusable v-for="item in items" :class="{ focus: focusIndex === $index }">
				<a href="#">{{ $index }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'component_name-vert',

  props: {
  	items: {
  		type: Array,
  		default: () => []
  	},
    currentScope: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    	focusIndex: 1,
    	offset: 0
    };
  },
  events: {
  	updateFocus (step) {
  		this.focusIndex += step
  	},
  	updateOffset (offset) {
  		this.offset = offset
  	}
  }
};
</script>
