<template>
  <div>
    <button @click="incrementCounter(3)">Increment +2</button>
    <button @click="plusCounter(2)">plus -2</button>
  </div>
</template>

<script>
import { incrementCounter, plusCounter } from '../vuex/actions'

export default {

  name: 'Increment',

  vuex: {
    actions: {
      incrementCounter,
      plusCounter
    }
  },
  methods: {
    increment () {
      this.incrementCounter(2)      // 向actions传递参数
    },
    plus () {
      this.plusCounter(3)
    }
  }
}
</script>

<style lang="css" scoped>
</style>