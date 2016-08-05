import * as Types from 'types'

const state = {
    showLeftNav: false,
    loading: false
}

const mutations = {
    [Types.SHOW_LEFTNAV] (state, visibility) {
        state.showLeftNav = visibility
    },
    [Types.START_LOADING] (state) {
        state.loading = true
    },
    [Types.FINISH_LOADING] (state) {
        state.loading = false
    }
}

export default {
    state,
    mutations
}