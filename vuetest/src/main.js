import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
	preLoad: 1.3
})

new Vue({
  el: '#app',
  render: h => h(App)
})
