import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  try: 3 // default 1
})


/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
