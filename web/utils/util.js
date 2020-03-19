import { removeStorage } from "@/utils/storage.js";

/**
 * 节流函数
 */
export function waterTap(func, delay) {
	if (!(typeof func === "function")) {
		console.warn("func 参数必须是Function类型");
		return () => {};
	}
	if (!(typeof delay === "number")) {
		console.warn("delay 参数必须是Number类型");
		return () => {};
	}
	let prev = Date.now();
	return function() {
		if (Date.now() - prev >= delay) {
			func.call(this, arguments);
			prev = Date.now();
		}
	};
}

/**
 * 防抖函数
 */
export function debounce(func, wait) {
	if (!(typeof func === "function")) {
		console.warn("func 参数必须是Function类型");
		return () => {};
	}
	if (!(typeof wait === "number")) {
		console.warn("wait 参数必须是Number类型");
		return () => {};
	}
	let timeout = null;
	return function() {
		timeout === null ? (timeout = true, func(arguments)) : (clearTimeout(timeout), timeout = setTimeout(() => {
			func(arguments);
			timeout = null;
		},wait));
	};
}

/**
 * 对象转换为url参数
 */
export function formatParams(params) {
	let str = "";
	for (let key in params) {
		str += (str ? '&' : '') + `${key}=${params[key]}`
	}
	return str ? "?" + str : str;
}

/**
 * 跳转路由
 */
export function toPage(route, params) {
	let pages = getCurrentPages();
	let pageIndex = pages.findIndex(item => item.route === route.substring(1));
	if (pageIndex !== pages.length-1 && pageIndex !== -1) {
		uni.navigateBack({
			delta: pages.length - pageIndex - 1,
			fail(err) {
				console.warn(err);
			}
		});
	} else {
		let paramStr = formatParams(params);
		uni.navigateTo({ url: route+paramStr, fail: () => {
			uni.switchTab({ url: route+paramStr });
		}});
	}
}

/**
 * 是否为空
 */
export function isEmpty(value) {
	return value === undefined || value === null || value === "";
}

/**
 * 页面附加在线js文件
 */
export function appendScript(url) {
	let body = document.querySelector("body");
	let script = document.createElement("script");
	script.src = url;
	body.appendChild(script);
}

/**
 * 格式化布尔值
 */
export function formatBoolean(value) {
	if (typeof value === "string") {
		return value === "false" ? false : true;
	} else {
		return !!value;
	}
}

/**
 * 获取url参数
 */
export function getQueryVariable(variable)
{
	let query = window.location.search.substring(1);
	let vars = query.split("&");
	for (let i=0;i<vars.length;i++) {
		let pair = vars[i].split("=");
		if(pair[0] === variable){return pair[1];}
	}
	return false;
}

/**
 * jssdk 获取code
 */
export function jssdkGetCode({scope, appid}) {
	removeStorage("sessionId");
	removeStorage("token");
	removeStorage("userInfo");
	let uri = window.location.protocol + "//" + window.location.host + window.location.pathname;
	(window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURI(uri)}&response_type=code&scope=${scope}&state=${scope}`);
}

//时间戳转时间
export function time(timestamp) {
  timestamp = timestamp.toString().length < 13 ? timestamp * 1000 : timestamp
  let date = new Date(timestamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}