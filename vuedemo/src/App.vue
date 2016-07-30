<template>
  <div>
    <Display></Display>
    <Increment></Increment>
  </div>
</template>

<script>
import store from './vuex/store'
import Display from './components/Display'
import Increment from './components/Increment'

export default {

  name: 'App',
  components: {
    Display,
    Increment
  },
  store             // 在根组件加入store, 连接子组件
}
</script>

<style lang="css" scoped>
</style>