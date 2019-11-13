import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from "axios"
import router from "./pages/router/index";
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css'
import store from "./vuex"

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$qs = qs;
Vue.prototype.axios = axios;

/* 
	
	to: Route: 即将要进入的目标路由对象
	from: Route: 当前导航正要离开的路由
	next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 
 */
router.beforeEach((to, from, next) => {

	if (to.meta.title) {
		document.title = to.meta.title //更改游览器网页标题
	}

	let getFlag = localStorage.getItem("Flag") /* 这里是判断用户是否登录过，因为在用户登录后会在localStroage内存储Flag=isLogin */
	if (getFlag == "isLogin") {
		store.state.isLogin = true
		next()
	} else {
		if (to.meta.isLogin) { /* 如果没有登录状态且要去往需要权限的路径时跳转登录页并进行提示 */
			next({
				path: "/loginhome"
			})
			alert("请先登录")

		} else {
			next()
		}
	}
})

router.afterEach(router => {
	window.scroll(0, 0)
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
