<style lang="css" scoped>
.list-wrapper { width: 750px; overflow: hidden; margin-bottom: 30px;}
.list { width: 10000px; }
li { display: inline-block; }
a { display: block; width: 200px; height: 120px; background-color: #2196f3; margin: 0 5px 10px; }
</style>
<template>
  <div class="list-wrapper">
    <ul class="list" v-key:list.hori="myList">
      <li class="focusable focus-current"><a href="">a</a></li>
      <li class="focusable"><a href="">b</a></li>
      <li class="focusable"><a href="">c</a></li>
      <li class="focusable"><a href="">d</a></li>
      <li class="focusable"><a href="">e</a></li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'component_name-list',

  data () {
    return {
        currFocus: 0,
        isScope: true
    }
  },
  methods: {
    scopeLeft () {
        console.log('scopeLeft')
        return 'changescope'
    },
    focusLeft () {
        console.log('focusLeft')
        // 改变UI相关的数据
        this.currFocus -= 1
        console.log(this.currFocus)
    }
  }
};
</script>