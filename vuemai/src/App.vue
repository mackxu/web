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
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'component_app',
  vuex: {
    getters: {
      loading: getLoadingState
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  store,
  ready() {
    // 计算根元素的font-size大小
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 6.4 + 'px';

    console.log('html size calculate!!');
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
