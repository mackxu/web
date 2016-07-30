<!-- slot允许外部环境插入内容到组件的视图结构内 -->
<template>
  <div>
    <h2>this is slot demo component!</h2>
    <slot name="test">如果没有分发内容就显示我</slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>