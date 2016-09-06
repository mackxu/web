exports.install = (Vue, options) => {
	let _ = Vue.util
	let hasbind = false
	let scopes = []
	let _keyMap = ['left', 'top', 'right', 'bottom']

	Vue.directive('scope', {
		bind () {
			let self = this
			this.modifiers.hori && (this.keyMap = { left: -1, right: 1 })
			this.modifiers.vert && (this.keyMap = { top: -1, right: 1 })
			this.addListener()
  		this.vm.$nextTick(() => {

  		})
		},
		update (value) {
			this.vm.$nextTick(() => {
				// 如果数据有变化, 会重新获取本scope内的可获焦元素
				let focusable = this.el.getAttribute('data-focus-name') || 'focusable'
				this._allFocus = this.el.querySelectorAll('[' + focusable + ']')
				console.log(this._allFocus)
				this._viewRect = this.el.getBoundingClientRect()					// scope 视口
				// 记录最前和最后元素的位置,用于滚动容器结束判断
				this.firstElRect = this._allFocus[0].getBoundingClientRect()
				this.lastElRect = this._allFocus[this._allFocus.length - 1].getBoundingClientRect()
				// 区分对待scope, 计算keyMap
				if (this.modifiers.group) {
					this.keyMap = {}
					this._allFocus.forEach(group => {
						this.keyMap[group.getAttribute('data-group-name')] = JSON.parse(group.getAttribute('data-next'))
					})
				}
			})
		},
		unbind () {

		},
		addListener () {
			this.keyHandler = this.keyHandler.bind(this)
			scopes.push(this)
			// 自定义的_switch事件
			this.vm.$on('_switch', e => {
				let keyType = void 0
				let which = e.which || e.keyCode
				which = _keyMap[which - 37]			// left, top, right, bottom
				if(this.modifiers.group) {			// 处理group切换
					// 查找下一个切换的group
					let focusIndex = this.el.getAttribute('data-focus-index')
					keyType = this.keyMap[focusIndex][which]
					if (!keyType) {
						return true
					}
				}else {
					if(which === 13) {
						return false
					}
					keyType = this.keyMap[which]
					if(!keyType) {
						// this.vm.$dispatch('_switch', e)			// 向上传播事件
						return true					// 向上传播
					}
					let focusIndex = +this.el.getAttribute('data-focus-index') + keyType
					let itemsLength = this._allFocus.length 			// 获取结束边界
					if(focusIndex < 0 || focusIndex >= itemsLength) {
						return true
					}
				}
				this.vm.$emit('updateFocus', keyType)
				this.vm.$nextTick(() => {

					// 获取新焦点位置
					let focusIndex = +this.el.getAttribute('data-focus-index')
					// 当中间位置与当前元素

					// 检查新焦点元素是否在视口中间位置
					// 检查滚动容器是否需要移动
					this.scrollScope(focusIndex, keyType)
				})
			})


			if(scopes.length && !hasbind) {
				hasbind = true
				this.onListen('start')
			}
		},
		onListen (start) {
			if (start) {
				window.addEventListener('keyup', this.keyHandler)
			}else {
				hasbind = false
				window.removeEventListener('keyup', this.keyHandler)
			}
		},
		keyHandler (e) {
			// 查找当前的scope, 并触发changeFocus事件
			let currentScope = scopes.find(scope => {
				return scope.el.hasAttribute('data-current-scope')
			})
			currentScope.vm.$dispatch('_switch', e)
		},
		scrollScope (focusIndex, keyType) {
			let el = this._allFocus[focusIndex]
			let len = this._allFocus.length
			let rect = el.getBoundingClientRect()
			let style = window.getComputedStyle(el)
			// 包装容器的中心位置
			let middle = parseFloat(this._viewRect.width) / 2
			// 计算当前焦点中心的位置
			let focusMiddle = parseFloat(rect.left) + parseFloat(rect.width) / 2
			let offset = +this.el.getAttribute('data-offset')
			// 滚动容器可滚动最大的距离
			let L = parseFloat(this._viewRect.right) - parseFloat(this.lastElRect.right)
			if ((keyType > 0 && focusMiddle > middle) || (keyType < 0 && focusMiddle < middle)) {
				offset = offset - keyType * Math.abs(focusMiddle - middle)
				if(offset <= L) {
					offset = L
				}
				if(offset >= 0) {
					offset = 0
				}
			}
			this.vm.$emit('updateXOffset', offset)
		},
		getXOffset (style) {
			return parseFloat(style.width) + parseFloat(style.marginRight) / 2
		},
		getYOffset (style) {
			return parseFloat(style.height) + parseFloat(style.marginBottom) / 2
		}
	})
}