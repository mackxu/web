	// 保证子域名之间的跨域
	document.domain = 'iqiyi.com';
	var $$ = function(id) { 
			return document.getElementById(id.replace('#', '')); 
		}
		, fbContent = $$('#js-fb-content')
		, fbBtn = $$('#j-btn-fb')
		, btnFbColorOk = '#5caf19' 				// 按钮可发送
		, btnFbColorNot = '#9c9c9c' 			// 按钮不可用
		, fbContentMaxLen = 140						// 反馈的最多字数
		, fbContentMaxLen = 4						// 反馈的最多字数
		, userAgent = navigator.userAgent	// 识别设备
		, ios = /(iPhone|iPad|iPod|ios)/i.test(userAgent)
		, Android = /Android/i.test(userAgent)
		, fbClass = '其他意见'
		, dialogMsg = {
			success: '反馈已收到，紧急处理中…',
			fail: '提交失败,请重试',
			error: '谢谢您的支持，但简短的描述对我们来说更为宝贵'
		}
		, dialogDiv = null
		, dialogTimer = null
		, aLog = []
		, myLog = function(msg) {
			aLog.push(msg);
			document.getElementById('j-log').innerText = aLog.join(', ');
		}
		, removeNode = function(node) {
			node.parentNode.removeChild(node);
		}
		, dialogShow = function(data) {
			if (dialogTimer !== null) {
				// 删除当前dialog, 并取消定时器
				clearTimeout(dialogTimer);
				removeNode(dialogDiv);
			}
			dialogDiv = document.createElement('div');
			dialogDiv.className = 'dialog-fb';
			dialogDiv.id = 'j-dialog-fb';
			dialogDiv.textContent = data;
			dialogTimer = setTimeout(function() {
				removeNode(dialogDiv);
				dialogTimer = null;
			}, 3500);
			document.querySelector('body').appendChild(dialogDiv);
		}
		, createIframeElement = function(name) {
			// 创建新的iframe等待渲染
			var frame = document.createElement('iframe');
			frame.name = name;
			frame.style.display = 'none';
			document.querySelector('body').appendChild(frame);
			return frame;
		}
		, getIframeData = function(options) {
			/**
			 * options:
			 * iframeName: 'frame-data' 默认值
			 * done: fn 
			 * before: fn
			*/
			// 创建iframe获取数据, 并插入到页面
			var frameElem = createIframeElement(options.iframeName || 'frame-data')
				, fail = options.fail
				, done = options.done
			;
			options.fail = function(res, frameElem) {
				// 显示错误提示框
				dialogShow(dialogMsg.fail);
				// 删除iframe
				frameElem.parentNode.removeChild(frameElem);
			};
			options.done = function(res, frameElem) {
				if (res.code === 'A00000') {
					done && done(res, frameElem);
				}else {
					options.fail && options.fail(res, frameElem);	
				}
			};
			// 定义要在frame中调用的函数
			frameElem.contentWindow.frameElement.callback = function(res) {
				options.done(res, frameElem);
			};
			// 在获取数据前，执行
			options.before && options.before();
		}
		, setBtnStateHelper = function(enable, color) {
			fbBtn.setAttribute('data-enable', enable);
			fbBtn.style.color = color;
		}
		, setBtnState = function() {
			var fbLen = getFbLen();
			var btnEnable = +fbBtn.getAttribute('data-enable');
			if (fbLen === 0) {
				if (btnEnable === 0) return; 					
				setBtnStateHelper(0, btnFbColorNot);					// 设置按钮为不可提交状态
			}else {
				if (btnEnable === 1) return;
				setBtnStateHelper(1, btnFbColorOk);					// 可提交状态
			}
		}
		, getFbLen = function() {
			return fbContent.value.replace(/\s+/g, '').length;
		}
	;
	// 添加键盘keyup事件处理函数
	fbContent.addEventListener('keyup', function(e) {
		setBtnState();
	}, false);

	fbContent.addEventListener('keydown', function(e) {
		if(getFbLen() >= fbContentMaxLen && e.keyCode !== 8 && e.keyCode !== 13) {
			myLog(1);
			// 禁止再输入, 并弹出提示框
			e.preventDefault();
			dialogShow(dialogMsg.error);
			return false;
		}
	}, false);

	fbContent.addEventListener('input', function(e) {
		if(ios) return;
		setBtnState();
		if(getFbLen() > fbContentMaxLen) {
			fbContent.value = fbContent.value.substring(0, fbContentMaxLen);
			dialogShow(dialogMsg.error);
		}
	}, false);

	// 当用户满足提交时, 用来手动提交表单的
	fbBtn.addEventListener('click', function() {
		// 检测提交按钮是否可用
		if (+fbBtn.getAttribute('data-enable') === 0) return false;
		fbBtn.href = fbBtn.getAttribute('data-href');
		getIframeData({
			done: function(res, frameElem) {
				// 获取ticket
				$$('js-ticket-fb').value = res.data;
				removeNode(frameElem);
				fbBtn.href = 'javascript:;';
				getIframeData({
					done: function(res, frameElem) {
						// 清空输入框，提交按钮置灰，显示成功提示框
						fbContent.value = '';
						setBtnState(0, btnFbColorNot);
						dialogShow(dialogMsg.success);
						// 清除创建的iframe
						removeNode(frameElem);
					},
					before: function() {
						// 创建完成iframe后，提交表单
						$$('#j-form-fb').submit();
					}
				});
			}
		});
	}, false);
	// 获取设备信息
	if(ios) {
		fbClass = 'IOS-general';
	}else if (Android) {
		fbClass = 'Android-general';
	}
	$$('#j-fb-class').value = fbClass;