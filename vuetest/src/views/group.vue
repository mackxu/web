<style lang="css" scoped>
.wrapper-group { height: 100%; }
.main {
	height: calc(100% - 200px);
	background-color: #eee;
	overflow: hidden;
}
.aside, .bside {
	position: relative;
	height: 100%;
}
.aside {
	float: left;
	width: 30%;
}
.bside {
	float: right;
	width: 65%;
}
</style>
<template>
	<div class="wrapper-group"
		v-scope.group
		data-focus-name="group2"
	>
		<hori group2
			data-group-name="hori"
			data-next='{"bottom": "vert"}'
			:items="items"
			:current-scope="focusIndex === 'hori'">
		</hori>
		<div class="main">
			<div class="aside">
				<vert group2
					data-group-name="vert"
					data-next='{"top": "hori", "right": "grid"}'
					:items="items"
					:current-scope="focusIndex === 'vert'">
				</vert>
			</div>
			<div class="bside">
				<grid group2
					data-group-name="grid"
					data-next='{"top": "hori", "left": "vert"}'
					:items="items"
					:current-scope="focusIndex === 'grid'">
				</grid>
			</div>
		</div>
	</div>
</template>

<script>
import Vert from './vert-content.vue'
import Grid from './grid-content.vue'
import Hori from './hori.vue'

export default {

  name: 'component_name-group',

  data () {
    return {
    	focusIndex: 'hori',
    	items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  events: {
  	updateFocus (group) {
  		this.focusIndex = group
  	}
  },
  components: { Hori,Vert, Grid }
};
</script>
