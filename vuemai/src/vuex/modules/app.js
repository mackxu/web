import * as Types from 'types'

const state = {
    showLeftNav: false,
    loading: false,
    title: '爱奇艺电影'
}

const mutations = {
    [Types.SHOW_LEFTNAV] (state) {
        state.showLeftNav = !state.showLeftNav
    },
    [Types.START_LOADING] (state) {
        state.loading = true
    },
    [Types.FINISH_LOADING] (state) {
        state.loading = false
    },
    [Types.UPDATE_TITLE] (state, title) {
        state.title = title
    }
}

export default {
    state,
    mutations
}