import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import * as Type from './mutations_type'

Vue.use(Vuex);

Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'

const state = {
  todos: [
    { text: 'xxxx', done: false },
    { text: 'xxxxx', done: false },
    { text: 'xxxxx', done: true }
  ]
}

const mutations = {
  [Type.ADD_TODO] (state, text) {
    state.todos.push({ text: text, done: false })
  },
  [Type.TOGGLE_ALL] (state, done) {
    state.todos.forEach(todo => todo.done = done)
  },
  [Type.DELETE_TODO] (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  [Type.TOGGLE_TODO] (state, todo) {
    todo.done = !todo.done
  },
  [Type.EDIT_TODO] (state, todo, text) {
    console.log('edit todo');
    todo.text = text
  },
  [Type.CLEAR_COMPLETED] (state) {
    state.todos = state.todos.filter(todo => !todo.done)
  }
}

export default new Vuex.Store({
  middlewares: debug ? [createLogger()] : [],
  state,
  mutations,
  strict: debug
})