'use strict'

exports.install = (Vue, Options) => {


	let touchstart = (e, el, modifiers) => {
		modifiers.stop && e.stopPropagation()
		modifiers.prevent && e.preventDefault()

		el.startTime = new Date()
		let touches = e.touches[0]
		let tapObj = el.tapObj
		tapObj.pageX = touches.pageX
		tapObj.pageY = touches.pageY
	}

	/**
	 * 执行tap handler
	 * @param  {[type]}   e        [description]
	 * @param  {[type]}   el       [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	let touchend = (e, el, callback) => {
		let touches = e.changedTouches[0]
		let tapObj = el.tapObj
		tapObj.distanceX = tapObj.pageX - touches.pageX
		tapObj.distanceY = tapObj.pageY - touches.pageY
		if(isTap(el)) {
			setTimeout(() => {
				e.tapObj = tapObj
				callback.call(this, e)
			}, 200)
		}
	}

	/**
	 * 根据条件判断是否是tap event
	 * @param  {[type]} el [description]
	 * @return {[type]}    [description]
	 */
	let isTap = (el) => {
		if(el.disabled) {
			return false
		}
		let tapObj = el.tapObj
		return (new Date) - el.startTime < 150 && Math.abs(tapObj.distanceX) < 4 && Math.abs(tapObj.distanceY) < 4
	}
	/**
	 * 为元素添加touchstart、touchend事件
	 * @param  {[type]} el                [description]
	 * @param  {[type]} options.value     [description]
	 * @param  {[type]} options.modifiers [description]
	 * @return {[type]}                   [description]
	 */
	let onListen = (el, { modifiers, value }) => {
		// 封装事件函数, 用于事件的解绑
		el._touchstart = e => touchstart(e, el, modifiers)
		el._touchend = e => touchend(e, el, value)
		// 添加监听处理函数
		el.addEventListener('touchstart', el._touchstart, false)
		el.addEventListener('touchend', el._touchend, false)
	}



	/**
	 * 移除元素上的监听事件函数
	 * 通过el作为函数的承载体, 解决无法获知事件函数问题
	 * @param  {[type]} el       [description]
	 * @param  {[type]} binding  [description]
	 * @param  {[type]} vnode    [description]
	 * @param  {[type]} OldVnode [description]
	 * @return {[type]}          [description]
	 */
	let componentWillUnmount = (el, binding, vnode, OldVnode) => {
		el.removeEventListener('touchstart', el._touchstart, false)
		el.removeEventListener('touchend', el._touchend, false)
	}
	let addListener = (el, binding, vnode) => {
		console.log('addListener')
		let fn = binding.value

		if(typeof fn !== 'function') {
			return _.warn('The value of directive "v-tap" must be a function!')
		}

		el.tapObj = {}
		el.startTime = void 0
		onListen(el, binding)
	}

	Vue.directive('tap', {
		acceptStatement : true,
		bind: addListener,
		unbind: componentWillUnmount
	})
}