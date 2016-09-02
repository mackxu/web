<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <!-- <demo></demo> -->
    <hori></hori>
  </div>
</template>

<script>
import Demo from './views/demo.vue'
import Hori from './views/hori.vue'
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  },
  components: { Demo, Hori },
  ready () {
    // window.addEventListener('keydown', e => {
    //   let which = e.which || e.keyCode
    //   this.$broadcast('changeFocus', which)
    // })
  }
}
</script>

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
html, body { height: 100%; }
</style>
