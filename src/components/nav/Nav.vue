<template>
	<!-- 导航栏组件1 -->
	<div id="nav">
		<div class="in">
			<div class="nav-left">
				<img class="nav-logo" src="http://s3.pstatp.com/bcy/image/logo-home.5f0c89.png" alt="" srcset="">

				<div class="search-box">
					<el-input v-model="inputVal" placeholder="搜索用户" @blur="hiddenResult" @input="handleSearch"></el-input>
					<ul class="search-list" :style="{display:isShowSearch}">
						<li @mouseenter="isSelect=true" 
							@mouseleave="isSelect=false"
						v-for="item in searchResult" :key="item.id" 
						@click="goToUser(item.nickname,item.headimg)">{{item.nickname}}</li>
					</ul>
				</div>

			</div>
			<div class="nav-right">
				<el-button class="nav-home-btn" type="text" @click="goToIndex" icon="el-icon-s-home">首页</el-button>
				<div v-if="$store.state.isLogin" class="avatar-div" @mouseenter="showDropDown" @mouseleave="hiddenDropDown">

					<el-avatar :class="[isShowDropDown=='none'?'nav-avatar-mini':'nav-avatar-big']" circle :src="headimg"></el-avatar>
					<!-- 下拉菜单 -->
					<div  class="user-dropdown" :style="{display:isShowDropDown}">
						<div class="user-dropdown-top">
							<p class="user-dropdown-name">{{nickname}}</p>
						</div>
						<ul>
							<li>
								<i class="el-icon-s-home"></i>
								<span class="user-dropdown-item">
									<router-link :to="{path: '/user',query: {nickname}}" target="_blank">个人主页</router-link>
								</span>
							</li>
							<li>
								<i class="el-icon-s-tools"></i>
								<span class="user-dropdown-item">
									<router-link to="/setting">设置</router-link>
								</span>
							</li>
						</ul>
						<div class="logout" @click="logout">
							退出账户
						</div>
					</div>

				</div>
				<!-- 未登录状态下，登录和注册 -->
				<div v-else class="account">
					<router-link to="/loginhome">登录</router-link>
					<router-link to="/register">注册</router-link>
				</div>
				<el-popover :open-delay="100" :close-delay="300" placement="top-start" trigger="hover">

					<!-- 发布框组件 -->
					<my-release></my-release>
					<el-button slot="reference" type="primary" icon="el-icon-edit-outline">发布</el-button>

				</el-popover>

			</div>
		</div>
	</div>
</template>

<script>
	import Release from "./Release.vue"
	import "@/assets/animate.css"

	export default {
		name: 'Nav',
		data() {
			return {
				inputVal: "",
				//用户信息
				nickname: "",
				headimg: "",
				isShowDropDown: "none",

				//搜索结果
				searchResult: [],
				isShowSearch: "none",
				isSelect:false//是否选择联想结果
				
			}
		},

		components: {
			"my-release": Release
		},
		methods: {
			/* 
			    处理下拉菜单的显示
			*/
			showDropDown() {
				this.isShowDropDown = "block"
			},
			hiddenDropDown() {
				this.isShowDropDown = "none"
			},
			/* 
				回到首页
			 */
			goToIndex() {

				if (this.$route.path == "/novel" || this.$route.path == "/illust") {
					this.$router.go(0)
				} else {
					this.$router.push("/")
				}
			},
			/* 
				退出账户
			 */
			logout() {
				this.$store.commit("logout")
				localStorage.removeItem("Flag")
			},
			/* 
				搜索用户
			 */
			handleSearch() {
				let nickname = this.inputVal.trim()
				if(nickname=="")return//为空则不查询
				let postData = this.$qs.stringify({
					nickname: nickname,
				})

				this.axios.post('http://localhost:8888/search', postData)
					.then((response) => {
						if (response.data.length != 0) {
							this.isShowSearch = "block"
							this.searchResult = response.data
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},
			//失去焦点隐藏搜索结果
			hiddenResult(isShow,isSelect) {
				if(this.isSelect==false){
					this.isShowSearch = "none"
					this.searchResult=[]
				}
				
			},
			/* 
				跳转搜索的用户页面
			 */
			goToUser(nickname, headimg) {

				if (this.$route.path == "/user") {
					this.$router.push({
						path: "/user",
						query: {
							nickname: nickname
						}
					})
					this.$router.go(0)
				} else {

					this.$router.push({
						path: "/user",
						query: {
							nickname: nickname
						}
					})
				}
			}
		},
		mounted() {

			this.headimg = JSON.parse(localStorage.getItem("accountMes")).headimg;
			this.nickname = JSON.parse(localStorage.getItem("accountMes")).nickname;
		}
	}
</script>

<style scoped>
	#nav {
		width: 100%;
		background-color: #fff;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
		height: 50px;
		position: fixed;
		z-index: 99;
		top: 0;
	}

	.in {
		display: flex;
		justify-content: space-between;
		width: 1200px;
		margin: 0 auto;
		line-height: 50px;
	}

	.nav-logo {
		width: 115px;
		height: 39px;
		margin-right: 40px;
	}

	.nav-left {
		display: flex;
		align-items: center;
	}

	/* 
		搜索框
	 */
	.search-box {

		position: relative;

	}

	.el-input>>>input {
		width: 280px;
		height: 36px;
	}

	.search-list {
		width: 280px;
		background-color: #fff;
		position: absolute;
		top: 43px;
		left: 0;
		box-sizing: border-box;
		border: 1px solid #e0e0e0;
	}

	.search-list li {
		line-height: 25px;
		font-size: 12px;
		padding: 0 10px;
	}

	.search-list li:hover {
		background-color: #f0f0f0;
	}

	/* 登录和注册 */
	.account {
		height: 50px;
		line-height: 50px;
		margin-right: 6px;
	}

	.account a {
		margin: 0 12px;
		color: #252526
	}

	.account a:hover {
		color: #fa4b8b;
	}

	/* 导航栏右侧 */
	.nav-right {
		display: flex;
		align-items: center;
	}

	.nav-home-btn {
		font-size: 16px;
		color: #909399;
		margin-right: 12px;
	}

	.avatar-div {
		width: 76px;
		height: 50px;
		position: relative;
	}

	.nav-avatar-mini {
		width: 32px;
		height: 32px;
		top: 9px;
		left: 22px;
		margin: 0;
		z-index: 100;
	}

	.nav-avatar-big {
		width: 64px;
		height: 64px;
		top: 9px;
		left: 6px;
		margin: 0;
		z-index: 100;
	}

	/* 下拉菜单 */
	.user-dropdown {
		background: #fff;
		width: 260px;
		position: absolute;
		top: 50px;
		left: -92px;
		line-height: 0;
		box-shadow: 0 0 6px 1px hsla(0, 0%, 73%, .5);
	}

	.user-dropdown-top {
		padding: 33px 20px 0;

	}

	.user-dropdown-name {
		padding-bottom: 12px;
		text-align: center;
		color: #252526;
		border-bottom: 1px solid #e0e0e0;
		line-height: 20px;
		font-size: 12px;
	}

	.user-dropdown ul {
		padding: 25px 20px;
		display: flex;
		justify-content: space-between;
		color: #252526;

	}

	.user-dropdown-item {
		font-size: 12px;
		padding-left: 10px;
	}

	.user-dropdown li {
		width: 109px;
	}

	.user-dropdown li:hover {
		color: #fa4b8b;
	}

	.user-dropdown li:hover a {
		color: #fa4b8b;
	}

	.logout {
		background: #f5f5fa;
		text-align: center;
		line-height: 30px;
		height: 30px;
		font-size: 14px;
		color: #252526;
		border-top: 1px solid #e0e0e0;
		cursor: pointer;
	}

	.logout:hover {
		color: #fa4b8b;
	}



	.nav-right .el-button {
		font-size: 16px;
		width: 88px;
		height: 36px;
		padding: 0;
		box-sizing: border-box;
	}
</style>
