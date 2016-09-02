exports.install = (Vue, options) => {
	let keyMap = {}
	let scopes = []
	Vue.directive('scope', {
		bind () {
			this.modifiers.hori && (keyMap = { 37: -1, 39: 1 })
			this.addListener()
			this._allFocus = this.el.querySelectorAll('[focusable]')
  		this.vm.$nextTick(() => {
  			this._viewRect = this.el.getBoundingClientRect()					// scope 视口
  			console.log(this._viewRect)
  		})
		},
		update (value) {
			this.changeFoucs = value
			console.log(typeof value)
		},
		unbind () {

		},
		addListener () {
			this.keyHandler = this.keyHandler.bind(this)
			scopes.push({
				el: this.el
			})

			if(scopes.length && !this.hasbind) {
				this.hasbind = true
				this.onListen('start')
			}
		},
		onListen (start) {
			if (start) {
				window.addEventListener('keyup', this.keyHandler)
			}else {
				this.hasbind = false
				window.removeEventListener('keyup', this.keyHandler)
			}
		},
		keyHandler (e) {
			let which = e.which || e.keyCode
			let keyType = keyMap[which]
			let focusIndex = +this.el.getAttribute('data-focusIndex') + keyType
			if(focusIndex < 1) {
				return false
			}
			if(focusIndex > 9) {
				return false
			}
			this.changeFoucs.call(this, keyType)
			this.vm.$nextTick(() => {
				// 检查焦点元素是否在视口内
				focusIndex = +this.el.getAttribute('data-focusIndex')
				this.scrollScope(this._allFocus[focusIndex - 1], keyType)
			})
		},
		scrollScope (el, keyType) {
			let rect = el.getBoundingClientRect()
			if(this.modifiers.hori) {					// 水平的list
				if(rect.right > this._viewRect.right || rect.left < this._viewRect.left) {
					this.changeFoucs.call(this, null, -this.getOffset(el) * keyType)
				}
			}
		},
		getOffset (el) {
			let style = window.getComputedStyle(el)
			return parseFloat(style.width) + parseFloat(style.marginRight) / 2
		}
	})
}