import Vue from 'vue'
import * as Types from 'types'

const BASE_URL = 'http://m.maizuo.com/v4/api'
const _get = (url) => {
    url += (url.indexOf('?') === -1 ? '?' : '&') + '_t=' + (+new Date())
    return Vue.http.get(url).then((res) => {
        if(res.status >= 200 && res.status < 300 ) {
            return res.data
        }
        return Promise.reject(new Error(res.status))
    })
}

const _post = (url, params) => {
    return Vue.http.post(BASE_URL + url, params).then((res) => {
        if(res.status >= 200 && res.status < 300 ) {
            return res.data
        }
        return Promise.reject(new Error(res.status))
    })
}

const _fetch = (dispatch, url, type) => {
    return _get(url)
        .then(res => {
            return res.status === 0 ? dispatch(type, res.data) :
                Promise.reject(new Error(type + ' failure'))
        }).catch(err => {
            return Promise.reject(err)
        }) 
}
/*----------------------------------------------------------*/

/**
 * 获取即将开始电影列表
 * @param  {Function} options.dispatch store对象解析出来的函数
 * @param  {Number} page             当前页数
 * @param  {Number} count            每页数量
 * @return {Promise}                 Promise
 */
export const fetchComingSoonFilms = ({dispatch}, page, count) => {
    let url = `/film/coming-soon?count=${count}&page=${page}`;
    return _fetch(dispatch, BASE_URL + url, Types.FETCH_COMING_SOON_SUCCESS)
}

/**
 * 获取正在播放的数据列表
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} page             [description]
 * @param  {[type]} count            [description]
 * @return {[type]}                  [description]
 */
export const fetchNowPlayingFilms = ({dispatch}, page, count) => {
    let url = `/film/now-playing?count=${count}&page=${page}`;
    return _fetch(dispatch, BASE_URL + url, Types.FETCH_NOW_PLAYING_SUCCESS)
}
/**
 * 获取电影详情
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} id               [description]
 * @return {[type]}                  [description]
 */
export const fetchFilmDetail = ({dispatch}, id) => {
    return _fetch(dispatch, BASE_URL + '/film/' + id, Types.FETCH_DETAIL_SUCCESS)
}
/**
 * 获取广告数据
 * @param  {[type]} options.dispatch [description]
 * @return {[type]}                  [description]
 */
export const fetchBillboards = ({dispatch}) => {
    return _fetch(dispatch, BASE_URL + '/billboard/home', Types.FETCH_BANNER_SUCCESS )
}

/**
 * show or hide left nav
 * @param  {[type]} options.dispatch [description]
 * @param  {Bool}   visibility       [description]
 * @return {[type]}                  [description]
 */
export const showLeftNav = ({ dispatch }) => {
    dispatch(Types.SHOW_LEFTNAV)
}