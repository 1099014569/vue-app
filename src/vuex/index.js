import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	//vuex的配置
	state: { //定义状态值，用于组件之间共享数据
		isLogin:false//当前登录状态
	},
	mutations: { //定义用来修改状态值的函数，需要通过commit来触发调用
		//登录上
		login: function(state) {
			state.isLogin=true
		},
		//登出
		logout:function(state){
			state.isLogin=false
		}
	}
})
