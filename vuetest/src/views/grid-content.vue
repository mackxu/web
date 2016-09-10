<style lang="css" scoped>
.wrapper {
  height: 100%; overflow: hidden;
  position: relative;
  padding-top: 190px;
}
.container-grid {
  position: absolute; top: 0;
  transition: transform .5s;
  width: 100%;
  height: 9999px;
}
li {
  padding: 10px 10px;
  float: left;
  width: calc(100% / 3)
}
a {
  display: block;
  height: 326px;
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
    v-scope:3.grid="items"
    :class="{ 'current-scope': currentScope }"
    :data-current-scope="currentScope">
    <ul class="container container-grid" :style="{transform: 'translateY('+ offset +'px)'}">
      <li focusable v-for="item in items" :class="{focus: focusIndex === $index}">
        <a href="#">{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'component_name-grid',

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
    	focusIndex: 0,
      offset: 0
    }
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