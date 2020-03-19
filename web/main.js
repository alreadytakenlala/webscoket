import Vue from "vue";
import App from "./App";
import store from "./store";
import { get, post } from "./config/http.js";
import {eventBus} from "./config/comm.js";
import api from "@/config/api.js";
import {toast, modal} from "@/config/package.js";
import {appendScript, toPage} from "@/utils/util.js";
import Observer from "@/utils/Observe.js";

import "./config/components.js";
import "./config/filter.js";

// #ifdef H5
// 添加h5图标
appendScript("//at.alicdn.com/t/font_1618128_vs73d7zg6k.js");

// 绑定onResize事件
let resize = new Observer("resize");
window.onresize = e => resize.notify(e);
Vue.prototype.$resize = resize;
// #endif

Vue.config.productionTip = false;
Vue.prototype.$store = store;
App.mpType = 'app';

Vue.prototype.$eventBus = eventBus;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$api = api;
Vue.prototype.$toast = toast;
Vue.prototype.$modal = modal;
Vue.prototype.$toPage = toPage;

const app = new Vue({
	store,
	...App
})
app.$mount();