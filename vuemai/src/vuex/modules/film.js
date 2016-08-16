import * as Types from 'types'

const state = {
    comingSoonFilms: [],
    nowPlayingFilms: [],
    detail: {},
    billboards: []
}

const mutations = {
    [Types.FETCH_COMING_SOON_SUCCESS] (state, data) {
        state.comingSoonFilms = data.films
    },
    [Types.FETCH_NOW_PLAYING_SUCCESS] (state, data) {
        state.nowPlayingFilms = data.films
    },
    [Types.FETCH_DETAIL_SUCCESS] (state, data) {
        state.detail = data.film
    },
    [Types.FETCH_BANNER_SUCCESS] (state, data) {
        state.billboards = data.billboards
    }
}

export default {
    state,
    mutations
}