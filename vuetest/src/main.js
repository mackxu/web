import Vue from 'vue'
import App from './App.vue'
import Dpad from './directives/dpad.js'

Vue.use(Dpad)

new Vue({
  el: 'body',
  components: { App }
})
