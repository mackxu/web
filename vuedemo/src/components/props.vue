<template>
  <span>hello outer props－{{ appProps }}－{{msg}}</span>
  <a href="javascript:;" @click="notify">啊啊啊</a>
</template>
<script>
  export default {
    // props: ['appProps', 'msg'],       // relating to the attribute define in outer <router-view> tag.
    props: {
      appProps: String,
      msg: String
    },
    data () {
      return {
      }
    },
    methods: {
      notify () {
        this.$dispatch('child-msg', 'hello notify')
      }
    }
  }
</script>