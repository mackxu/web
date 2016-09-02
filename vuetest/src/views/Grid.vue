<style lang="css" scoped>
li { display: inline-block; }
a { display: block; width: 200px; height: 120px; background-color: #009688; margin: 0 5px 10px; }
</style>
<template>
	<ul class="grid" v-key:grid="myGrid">
		<li class="focusable focus-current"><a href="#">1</a></li>
		<li class="focusable"><a href="#">2</a></li>
		<li class="focusable"><a href="#">3</a></li>
		<li class="focusable"><a href="#">4</a></li>
		<li class="focusable"><a href="#">5</a></li>
		<li class="focusable"><a href="#">6</a></li>
		<li class="focusable"><a href="#">7</a></li>
		<li class="focusable"><a href="#">8</a></li>
		<li class="focusable"><a href="#">9</a></li>
	</ul>
</template>

<script>
export default {

  name: 'component_name-grid',

  props: {
  	testProp: Function,
  },

  data () {
    return {
    	focusIndex: 0
    };
  },
  methods: {
  	updateFocus (step) {
  		this.focusIndex += step
  	},
  	childClick () {
  		console.log('childClick')
  		this.$emit('testEvent')
  		this.testProp.call()
  	}
  }
};
</script>