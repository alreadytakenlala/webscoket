import store from "store";
import { getStorage } from "@/utils/storage.js";
import { debounce, getQueryVariable, jssdkGetCode } from "@/utils/util.js";
import { modal } from "@/config/package.js";
import { BIND, BIND_PHONE } from "@/config/router.js";
import { eventBus, checkUserInfo } from "@/config/comm.js";
import { toPage } from "@/utils/util.js";

export function get(url, data, config) {
	return _request({
		...config,
		url,
		data,
		method: "GET"
	});
}

export function post(url, data, config) {
	return _request({
		...config,
		url,
		data,
		method: "POST"
	});
}

const VERSON = Date.now();
let loadingStatus = false;
let inJssdkGetCode = false;

function _request({
	method = "GET",
	url = "",
	data = {},
	dataType = "json",
	responseType = "text",
	header = {},
	needToken = true,
	showLoading = true,
	loadingText = "数据加载中",
	hideLoading = true,
	showSucessToast = false,
	successText = "数据加载成功",
	showErrorModal = true,
	errorText = "数据加载失败",
	returnHeader = false,
	returnErrorCode = false,
	checkCode = true,
	nocache = true
}) {
	return new Promise((resolve, reject) => {
		showLoading && _loadingDecoration({
			title: loadingText,
			state: true
		});
		
		header.terminal = "WX_MP";
		header.sessionId = getStorage("sessionId");
		header.token = getStorage("token");
		// #ifdef H5
		header.domain = window.location.host;
		// #endif
		
		console.log("请求参数：", JSON.stringify(data));
		
		// 添加随机参数，防止浏览器缓存
		nocache && (url += `?t=${VERSON}`);

		uni.request({
			method,
			url,
			data,
			dataType,
			responseType,
			header,
			success: async function(res) {
				switch (res.data.code) {
					case 0:
						resolve(res.data);
						break;
					case 2006:
						reject(res.data);
						showErrorModal && modal({
							content: res.data.msg || res.code,
							showCancel: false
						});
						checkUserInfo();
						break;
					case 9000:
						reject(res.data);
						if (!inJssdkGetCode) {
							inJssdkGetCode = true;
							!getQueryVariable("code") && jssdkGetCode({scope: "snsapi_userinfo", appid: store.state.user.platformInfo.wxMpAppId});
						}
						break;
					case 9001:
						reject(res.data);
						toPage(BIND);
						break;
					case 9002:
						reject(res.data);
						toPage(BIND_PHONE);
						break;
					default:
						reject(res.data);
						showErrorModal && modal({
							content: `${res.data.error} ${res.statusCode}`,
							showCancel: false
						});
				}
			},
			fail: function(err) {
				showErrorModal && modal({
					content: "哦豁，网络开小差了，再次请求试试",
					showCancel: false
				});
				reject(err);
			},
			complete: function() {
				showLoading && _loadingDecoration({
					state: false
				});
			}
		})
	});
}

/**
 * 加载动画
 */
function _loadingDecoration({
	state,
	title
}) {
	state !== loadingStatus && (state ? uni.showLoading({
		title
	}) : uni.hideLoading(), loadingStatus = state);
}