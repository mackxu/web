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
  vuex: {
    getters: {
      loading: getLoadingState
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  store
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
