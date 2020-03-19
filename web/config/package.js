/**
 * 对uni-app的api的二次封装
 */

/**
 * 微信弹框 Model
 */
export function modal({
	title = '温馨提示',
	content = '未知错误',
	confirmText = '确认',
	showCancel = true,
	successFunction = () => {},
	failFunction = () => {}
} = {}) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			uni.showModal({
				title,
				content,
				confirmText,
				showCancel,
				cancelColor: '#888888',
				confirmColor: '#000',
				success: res => {
					resolve(res);
				},
				fail: err => {
					reject(res);
				}
			})
		}, 100);
	});
}

/**
 * 微信弹框 TOAST
 */
export function toast({
	title = '紧急加载中',
	mask = true,
	icon = 'loading',
	duration = 1000
} = {}) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			wx.showToast({
				title: title,
				mask: mask,
				icon: icon,
				duration: duration,
				success(res) {
					resolve(res);
				},
				fail(res) {
					reject(res);
				}
			})
		}, 100);
	});
}

/**
 * 调起微信支付
 */
export function wxpay(wxJsApiParam) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			...wxJsApiParam,
			success(res) {
				toast({
					title: "购买成功",
					icon: "success"
				}).then(res => {
					resolve({
						type: 'success',
						msg: res
					})
				})
			},
			fail(res) {
				if (res.errMsg !== 'requestPayment:fail cancel') { //如果失败原因是(非用户取消的正常失败事件)为真
					model({
						title: '系统错误',
						content: res.errMsg,
						showCancel: false
					}).then(res => {
						reject({
							type: 'error',
							msg: res
						})
					});
				} else { //用户正常取消
					model({
						content: '用户取消购买支付',
						showCancel: false
					}).then(res => {
						resolve({
							type: 'cancel',
							msg: res
						})
					});
				}
			}
		})
	});
}
