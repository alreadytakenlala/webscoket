import Vue from "vue";
import store from "store";
import { toPage } from "@/utils/util.js";
import { HOME, BIND_PHONE, BIND, WELCOME } from "@/config/router.js";

export const eventBus = new Vue();

export function checkUserInfo() {
	const userInfo = store.state.user.userInfo, pages = getCurrentPages(), currentRoute = pages[pages.length-1] && '/'+pages[pages.length-1].route;
	if (!userInfo.mobile) uni.reLaunch({ url: BIND_PHONE });
	else if (!userInfo.role) uni.reLaunch({ url: BIND });
	else if (currentRoute === WELCOME || currentRoute === BIND || currentRoute === BIND_PHONE) uni.reLaunch({ url: HOME });
}