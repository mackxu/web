<template>
  <div id="app-view">
    <router-view></router-view>
    <div class="nprogress">
    </div>
  </div>
</template>

<script>
require('./assets/styles/reset.css')
require('./assets/styles/icon.css')
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
