<template>
  <div id="input">
    <!-- 单个勾选框 -->
    <input type="checkbox" id="name" v-model="checked">
    <label for="name">{{checked}}</label>
    <!-- 多个勾选框 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: false
    }
  }
}
</script>
<style></style>