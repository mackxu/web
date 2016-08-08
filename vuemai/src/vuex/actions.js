import Vue from 'vue'
const BASE_URL = 'http://m.maizuo.com/v4/api'
const _get = (url) => {
    return Vue.http.get(BASE_URL + url).then((res) => {
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

/*----------------------------------------------------------*/

/**
 * 获取即将开始电影列表
 * @param  {Function} options.dispatch store对象解析出来的函数
 * @param  {Number} page             当前页数
 * @param  {Number} count            每页数量
 * @return {Promise}                 Promise
 */
export const fetchComingSoonFilms = ({dispatch}, page, count) => {
    
}

/**
 * 获取正在播放的数据列表
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} page             [description]
 * @param  {[type]} count            [description]
 * @return {[type]}                  [description]
 */
export const fetchNowPlayingFilms = ({dispatch}, page, count) => {

}
/**
 * 获取电影详情
 * @param  {[type]} options.dispatch [description]
 * @param  {[type]} id               [description]
 * @return {[type]}                  [description]
 */
export const fetchFilmDetail = ({dispatch}, id) => {

}
/**
 * 获取广告数据
 * @param  {[type]} options.dispatch [description]
 * @return {[type]}                  [description]
 */
export const fetchBillboards = ({dispatch}) => {

}