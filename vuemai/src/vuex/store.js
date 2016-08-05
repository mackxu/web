import Vue from 'vue'
import Vuex from 'vuex'
import moduleApp from './modules/app'
import moduleFilm from './modules/film'
import createLogger from 'vuex/logger'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    middlewares: debug ? [createLogger()] : [],
    modules: { moduleApp, moduleFilm },
    strict: debug
})