<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <!-- <List></List> -->
    <div class="wrapper" v-tap="hello">
      <p>two button</p>
      <a href="javascript:;" v-tap.stop="hello" :msg="msg">tap test</a><br>
      <a href="javascript:;" v-tap.stop="hello" :msg="msg">tap test</a>
    </div>
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
