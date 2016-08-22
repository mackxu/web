<template>
  <div>
    <Display></Display>
    <Increment></Increment>
    <!-- 演示图片延迟加载 -->
    <List></List>
  </div>
</template>

<script>
import store from './vuex/store'
import Display from './components/Display'
import Increment from './components/Increment'
import List from './components/List'

export default {

  name: 'App',
  components: {
    Display,
    Increment,
    List
  },
  store             // 在根组件加入store, 连接子组件
}
</script>

<style lang="css" scoped>
</style>