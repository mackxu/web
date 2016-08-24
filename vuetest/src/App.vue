<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <!-- <List></List> -->
    <a href="javascript:;" v-tap="hello" :msg="msg">tap test</a><br>
    <a href="javascript:;" v-tap="hello" :msg="msg">tap test</a>
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
  methods: {
    hello (name) {
      console.log(name)
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
