<template>
  <main class="main">
    <Navbar></Navbar>
    <div class="app-view">
      <router-view></router-view>
    </div>
    <Sidebar></Sidebar>
    <div class="nprogress">
    </div>
  </main>
</template>

<script>
require('./assets/styles/reset.css')
require('./assets/styles/icon.css')

import store from 'store'
import { getLoadingState } from 'getters'
import { updateTitle } from 'actions'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'component_app',
  vuex: {
    getters: {
      loading: getLoadingState
    },
    actions: { updateTitle }
  },
  components: {
    Navbar,
    Sidebar
  },
  store,
  ready () {
    // 计算根元素的font-size大小
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 6.4 + 'px';

    console.log('html size calculate!!');
  },
  created () {
    this.$route.router.afterEach(({ to }) => {
      console.log(to.name)
      this.updateTitle('爱奇艺电影')
    })
  }
}
</script>

<style>
body {
  font-family: 'Microsoft YaHei', Tahoma, Helvetica, Arial, sans-serif;
  background-color: #ebebeb;
  font-size: 0.3rem;
  padding-top: 1rem;
}
</style>
