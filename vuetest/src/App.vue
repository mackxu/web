<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <List></List>
  </div>
</template>

<script>
import List from './views/List'
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  components: {
    List
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
