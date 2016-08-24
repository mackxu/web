import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import VueTap from './directives/tap'

Vue.use(VueLazyload, {
	preLoad: 1.3
})

Vue.use(VueTap)

new Vue({
  el: '#app',
  render: h => h(App)
})
