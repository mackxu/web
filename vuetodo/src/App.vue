<style lang="css">
  .container { width: 500px; height: 300px; font-size: 32px; }
  .container-home {  }
  .container-epg {}
  .container-detail {}
  .container-subject {}
  .container-play {}
</style>

<template>
  <div class="container container-home" v-show="currPage === 'home'">home-1</div>
  <div class="container container-epg" v-show="currPage === 'epg'">epg-2</div>
  <div class="container container-detail" v-show="currPage === 'detail'">detail-3</div>
  <div class="container container-subject" v-show="currPage === 'subject'">subject-4</div>
  <div class="container container-play" v-show="currPage === 'play'">play-5</div>
</template>

<script>
// 引入js库
import Utils from './libs/utils'

export default {
  data () {
    return {
      currPage: 'home'    // 修改此处
    }
  },
  methods: {    // 方法
    
  },
  ready() {

    Utils.test();
    window.addEventListener('keydown', e => {
      let which = e.which - 37;
      if(which === 0) this.currPage = 'home';
      if(which === 1) this.currPage = 'epg';
      if(which === 2) this.currPage = 'detail';
      if(which === 3) this.currPage = 'subject';

    })
  }
}
</script>
