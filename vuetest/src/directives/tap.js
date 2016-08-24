'use strict'

exports.install = (Vue, Options) => {

	let _ = Vue.util

	let time = void 0

	let touchstart = (e, el) => {
		time = new Date()
		let touches = e.touches[0]
		let tapObj = el.tapObj
		tapObj.pageX = touches.pageX
		tapObj.pageY = touches.pageY
	}

	let touchend = (e, el, callback) => {
		let touches = e.changedTouches[0]
		let tapObj = el.tapObj
		tapObj.distanceX = tapObj.pageX - touches.pageX
		tapObj.distanceY = tapObj.pageY - touches.pageY
		if(isTap(el)) {
			setTimeout(() => {
				e.tapObj = tapObj
				callback.call(this, e)
			})
		}
	}

	let isTap = (el) => {
		if(el.disabled) {
			return false
		}
		let tapObj = el.tapObj
		return (new Date) - time < 150 && Math.abs(tapObj.distanceX) < 4 && Math.abs(tapObj.distanceY) < 4
	}

	let onListen = (el, binding) => {
		el.addEventListener('touchstart', e => {
			touchstart(e, el)
		}, false)

		el.addEventListener('touchend', e => {
			touchend(e, el, binding.value)
		}, false)
	}

	let componentWillUnmount = (el, binding, vnode, OldVnode) => {
		el.removeEventListener('touchstart')
		el.removeEventListener('touchend')
	}
	let addListener = (el, binding, vnode) => {
		console.log(binding)
		let fn = binding.value

		if(typeof fn !== 'function') {
			return _.warn('The value of directive "v-tap" must be a function!')
		}

		el.tapObj = {}
		onListen(el, binding)
	}

	Vue.directive('tap', {
		acceptStatement : true,
		bind: addListener,
		update: addListener,
		unbind: componentWillUnmount
	})
}