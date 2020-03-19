import types from '../mutationTypes'
import api from "@/config/api.js";
import { post } from "@/config/http.js";
import {setStorage, getStorage, removeStorage} from "@/utils/storage.js";
import { getQueryVariable } from "@/utils/util.js";

const user = {
	namespaced: true,
	state: {
		userInfo: getStorage("userInfo") || {},
		platformInfo: getStorage("userInfo") || {}
	},
	mutations: {
		[types.SET_USER_INFOR](state, data) {
			setStorage("userInfo", data);
			state.userInfo = data;
		},
		[types.SET_PLATFORM_INFO](state, data) {
			setStorage("platformInfo", data);
			state.platformInfo = data;
		}
	},
	actions: {
		loadPlatform: async function ({commit,state}) {
			let res = await post(api.GET_PLATFORM_INFO, undefined, {showLoading: false});
			commit(types.SET_PLATFORM_INFO, res.data);
			return res.data;
		},
		loadUserInfo: async function({commit,state}) {
			let res = await post(api.GET_USER_INFO, undefined, {showLoading: false});
			commit(types.SET_USER_INFOR, res.data);
		},
		login: async function({dispatch, commit, state}, data) {
			removeStorage("sessionId");
			removeStorage("token");
			removeStorage("userInfo");
			let res = await post(api.WX_LOGIN, data, {showLoading: false});
			setStorage("sessionId", res.data.sessionId);
			setStorage("token", res.data.token);
			await dispatch("loadUserInfo");
			window.location.reload();
		},
		clearToken({
			commit,
			state
		}) {

		}
	}
}

async function sleep(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

export default user
