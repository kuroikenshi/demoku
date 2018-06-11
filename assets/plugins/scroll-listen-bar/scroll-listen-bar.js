;(function (factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD模式
		define(['jquery'], factory);
	} else {
		// 全局模式
		factory(jQuery);
	}
}(function ($, undefined) {
	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	$.fn.register = function($extFm) {
		var that = this;

		$(that).each(function() {
			var $this = $(this);

			// 注册表单层
			var $regCtn = $($this.find('.register-container')[0]);
			// 把手对象
			var $handler = $($this.find('.register-handler')[0]);
			// 给把手绑定弹出事件 
			$handler.on('click', popRegister);

			// 是否弹出框(false: 状态1, true: 状态2)
			var isActived = false;
			// 是否正在弹出
			var isRunning = false;
			// 是否正在倒计时
			var isCD = false;
			// 计时任务
			var ttask = undefined;

			// 弹出层重置方法，归位，隐藏重置按钮，状态0
			function reset() {
				// 状态还原
				isActived = false;
				isRunning = false;
				isCD = false;
				if (ttask !== undefined) {
					clearTimeout(ttask);
				}
				
				// 注册框位置还原
				$regCtn.removeClass('register-fixed');
				$regCtn.attr('style', '');

				// 清除掉多余的事件监听
				$regCtn.off('mouseover').off('mouseout');

				// 把手还原
				$handler.attr('style', '');
			}

			// 弹出把手，收回表单，状态1
			function popHandler() {
				// 浮动模式
				$regCtn.addClass('register-fixed');
				// 还原到一开始的状态
				$regCtn.attr('style', '');

				// 收回注册表单
				if (!isRunning) {
					isRunning = true;
					$regCtn.animate({left: "-100%"}, "slow", "swing", function() {
						// 弹出把手层
						$handler.animate({left: "0px"}, "slow", "swing", function() {
							isRunning = false;
						});
					});
				}
			}

			// 启动倒计时
			function startCountDown() {
				if (!isCD) {
					// 倒计时自动触发事件
					ttask = setTimeout(function() {
						popHandler();
						isCD = false;
					}, 5000);
					isCD = true;
				}
			}

			// 结束倒计时
			function terminateCountDown() {
				if (ttask !== undefined) {
					clearTimeout(ttask);
					isCD = false;
				}
			}

			// 弹出注册表单，收回把手，状态2
			function popRegister() {
				// 收回把手层
				if (!isRunning) {
					// console.log('收回把手');
					isRunning = true;
					$handler.animate({left: "-150px"}, "slow", "swing", function() {
						// 弹出form层
						$regCtn.animate({left: "0px"}, "slow", "swing", function() {
							isRunning = false;
						});
					});	
				}

				startCountDown();

				// 加鼠标进入，清除ttask的监听
				$regCtn.off('mouseover').off('mouseout');
				$regCtn.on('mouseover', function() {
					terminateCountDown();

					// 加鼠标退出，重新建立5s的ttask任务的监听
					$regCtn.off('mouseout');
					$regCtn.on('mouseout', function() {
						// 启动计时，到时返回状态1
						startCountDown();
					});
				});
			}

			// 绑定滚动事件
			$(window).scroll(function(evt) {
				var scrollTop = getScrollTop();			// 滚动条位置
				var windowHeight = $(window).height();	// 显示区域高度

				// console.log(scrollTop, '>', windowHeight, '=?=>', (scrollTop > windowHeight));

				// 如果小于1屏，一切还原
				if (scrollTop <= windowHeight) {
					reset();
				}
				// 如果大于1屏
				else {
					// 避免多次触发
					if (!isRunning) {
						// 如果不是激活状态，弹出门把手
						if (!isActived) {
							popHandler();
							isActived = true;
						}

						// 如果是激活状态，不做任何事儿
						else {
							// console.log('isActived');
						}
					}

					// 如果是正在弹出状态，不做任何事儿
					else {
						// console.log('isRunning');
					}
				}
			});
		});
	};
}));