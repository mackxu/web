<style>
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  padding: 0;
  margin: 0;
}
ul { list-style: none; }
body {
  font-family: Helvetica, sans-serif;
}
html, body, #app { height: 100%; overflow: hidden; }
.container:after, .container:before {
  content: "";
  display: table;
}
.nav {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}
</style>
<template>
  <div id="app">
    <component :is="currentView" ></component>
    <ul class="nav">
      <li><a href="javascript:;" @click.stop.prevent="selectComponet('Index')">Index</a></li>
      <li><a href="javascript:;" @click.stop.prevent="selectComponet('Grid')">Grid</a></li>
      <li><a href="javascript:;" @click.stop.prevent="selectComponet('Vert')">Vert</a></li>
      <li><a href="javascript:;" @click.stop.prevent="selectComponet('Group')">Group</a></li>
    </ul>
  </div>
</template>

<script>
import Demo from './views/demo.vue'
import Index from './views/index.vue'
import Vert from './views/vert.vue'
import Grid from './views/grid.vue'
import Group from './views/group.vue'
export default {
  data () {
    return {
      msg: 'Hello Vue!',
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      currentView: 'Group'
    }
  },
  methods: {
    selectComponet (name) {
      this.currentView = name
    }
  },
  components: { Demo, Index, Vert, Grid, Group }
}
</script>
