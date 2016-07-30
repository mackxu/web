<template>
  <ul id="my-list">
    <li v-for="item in items">
      {{ item.message }} - {{ $index }}
    </li>
  </ul>
  <ul id="m-list">
    <!-- 将v-for用在<template>标签上，以渲染一个包含多个元素的块 -->
    <template v-for="item in items">
      <li>{{ item.message }}</li>
      <li>{{ item.message }} - {{ $index }}</li>
    </template>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      checked: false,
      items: [
        { message: 'abc' },
        { message: 'dfe' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
  font-size: 70px;
}
</style>
