import Vue from 'vue'
import Vuex from 'vuex'
import { INCREMENT, PLUS } from './mutations'
import createLogger from 'vuex/logger'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

// 创建一个对象来保存应用启动时的状态
const state = {
  count: 0
}
// 放置状态变更方法
// 方法名与actions dispatch的名字一致
const mutations = {
  [INCREMENT] (state, amount) {
    state.count += amount
  },
  [PLUS] (state, amount) {
    state.count -= amount
  }
}

// 整合初始状态和变更函数，我们就得到了所需要的store
export default new Vuex.Store({
  middlewares: debug ? [createLogger()] : [],
  state,
  mutations,
  strict: debug
})
