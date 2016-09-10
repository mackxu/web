exports.install = (Vue, options) => {
	let _ = Vue.util
	let hasbind = false
	let scopes = []
	let prevScope = null 					// 上一次记忆, 用于group之间的切换
	let _keyMap = ['left', 'top', 'right', 'bottom']
	let isEmptyObject = obj => {
		for (let prop in obj) {
			return false
		}
		return true
	}
	Vue.directive('scope', {
		bind () {
			// 初始化每一种scope
			// _side 方位
			// _side_ 反方向
			// _size 宽度或高度
			this._side = 'bottom'
			this._side_ = 'top'
			this._size = 'height'
			if(this.modifiers.hori) {
				this.keyMap = { left: -1, right: 1 }
				this._side = 'right'
				this._side_ = 'left'
				this._size = 'width'
			} else if(this.modifiers.vert) {
				this.keyMap = { top: -1, bottom: 1 }
			}else if(this.modifiers.grid) {
				let cols = +this.arg
				this.keyMap = { left: -1, right: 1, top: -cols, bottom: cols }
			}
			this.addListener()
		},
		update (value) {
			let self = this
			this.vm.$nextTick(() => {
				// 如果数据有变化, 会重新获取本scope内的可获焦元素
				let focusable = this.el.getAttribute('data-focus-name') || 'focusable'
				this._allFocus = this.el.querySelectorAll('[' + focusable + ']')
				console.log(this._allFocus)
				if (this._allFocus.length === 0) {
					return false
				}
				/*
				 * scope可能是group的焦点
				 */
				this._allFocus.forEach(focus => {
					focus._scope_  = self.vm
				})
				this._viewRect = this.el.getBoundingClientRect()					// scope 视口
				this._viewMiddle = parseFloat(this._viewRect[this._side_]) + parseFloat(this._viewRect[this._size]) / 2
				// 记录最前和最后元素的位置,用于滚动容器结束判断
				this.firstElRect = this._allFocus[0].getBoundingClientRect()
				this.lastElRect = this._allFocus[this._allFocus.length - 1].getBoundingClientRect()
				// 滚动容器可滚动最大的距离
				this._maxScrollDistance = parseFloat(this._viewRect[this._side]) - parseFloat(this.lastElRect[this._side])
				// 区分对待scope, 计算keyMap
				if (this.modifiers.group) {
					this.keyMap = {}
					this._allFocus.forEach(group => {
						this.keyMap[group.getAttribute('data-group-name')] = JSON.parse(group.getAttribute('data-next')) || {}
					})
				}
			})
		},
		unbind () {
			scopes.splice(scopes.indexOf(this), 1)			// 删除当前的this
			if(scopes.length === 0 && hasbind) {				// 解除按键监听
				prevScope = null
				this.onListen()
			}
		},
		addListener () {
			this.keyHandler = this.keyHandler.bind(this)
			scopes.push(this)
			if(scopes.length && !hasbind) {
				hasbind = true
				this.onListen('start')
			}
			// 自定义的_switch事件
			this.vm.$on('_switch', e => {
				let keyType = void 0
				let which = e.which || e.keyCode
				let whichKey = _keyMap[which - 37]			// left, top, right, bottom

				if(this.modifiers.group) {			// 处理group切换
					// 查找下一个切换的group
					if (!isEmptyObject(prevScope) && prevScope[whichKey]) {
						keyType = prevScope[whichKey]
					} else {
						keyType = this.keyMap[this.vm.focusIndex][whichKey]
					}
					if (!keyType) {
						return this.emitParent(e)
					}else {
						let _which = which < 39 ? which + 2 : which - 2
						prevScope = { [_keyMap[_which - 37]]: this.vm.focusIndex }
					}
				}else {
					if(which === 13) {
						return false
					}
					keyType = this.keyMap[whichKey]
					if(!keyType) {
						return this.emitParent(e)
					}
					let focusIndex = this.vm.focusIndex
					// 对grid的left做单独处理
					// 如果到左边缘, grid不处理事件
					if (this.modifiers.grid) {
						if (whichKey === 'left' && (focusIndex % this.arg === 0)) {
							return this.emitParent(e)
						}else if (whichKey === 'top' && (focusIndex < this.arg)) {
							return this.emitParent(e)
						}
					}
					focusIndex = focusIndex + keyType
					let itemsLength = this._allFocus.length 			// 获取结束边界

					if(focusIndex < 0) {
						return this.emitParent(e)
					}else if (focusIndex >= itemsLength) {
						if (this.modifiers.grid && (focusIndex - itemsLength - 1 < this.arg)) {
							keyType = itemsLength - 1 - this.vm.focusIndex
						}else {
							return this.emitParent(e)
						}
					}
				}
				keyType && this.vm.$emit('updateFocus', keyType)
				this.vm.$nextTick(() => this.scrollScope(keyType))
			})

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
			// dispatch 派发事件, 先在实例上出发它, 然后沿着父链向上冒泡
			// 监听器返回true 会继续冒泡
			currentScope && currentScope.vm.$emit('_switch', e)
		},
		scrollScope (keyType) {
			let offset = this.vm.offset 				// 滚动容器的偏移量[只读]
			if(offset === void 0) {
				return _.warn('dont has offset prop', this.vm)
			}
			let el = this._allFocus[this.vm.focusIndex]
			let len = this._allFocus.length
			let rect = el.getBoundingClientRect()
			if (this.modifiers.hori || this.modifiers.vert) {
				// 计算当前焦点中心的位置
				let focusMiddle = parseFloat(rect[this._side]) - parseFloat(rect[this._size]) / 2
				if ((keyType > 0 && focusMiddle > this._viewMiddle) || (keyType < 0 && focusMiddle < this._viewMiddle)) {
					offset = offset - keyType * Math.abs(focusMiddle - this._viewMiddle)
				}
			}else {
				if (rect[this._side] > this._viewRect[this._side]) {
					offset -= rect[this._size]
				}else if (rect[this._side_] < this._viewRect[this._side_]) {
					offset += rect[this._size]
				}
			}
			// 处理动画过界
			if(offset <= this._maxScrollDistance) {
				offset = this._maxScrollDistance
			}
			if(offset >= 0) {
				offset = 0
			}
			this.vm.$emit('updateOffset', offset)
		},
		emitParent (e) {
			this.el._scope_ && this.el._scope_.$emit('_switch', e)
		}
	})
}