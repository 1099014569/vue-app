<template>
	<!-- 导航栏组件2 -->
	<div id="other-nav">
		<div class="in">
			<div class="nav-left">
				<img class="nav-logo" src="http://s3.pstatp.com/bcy/image/logo-home.5f0c89.png" alt="" srcset="">
				<ul class="item-list">
					<li v-for="(item,index) in navData.navList" :key="item.id" :class="[navData.nowPage===index?nowPageColor:otherPageColor]"
					 @click="goTo(item)">
						{{item.title}}
					</li>
					
				</ul>
			</div>
			<div class="nav-right">
				<div class="search-box">
					<el-input v-model="inputVal" placeholder="搜索用户" @blur="hiddenResult" @input="handleSearch"></el-input>
					<ul class="search-list" :style="{display:isShowSearch}">
						<li @mouseenter="isSelect=true" @mouseleave="isSelect=false" v-for="item in searchResult" :key="item.id" @click="goToUser(item.nickname,item.headimg)">{{item.nickname}}</li>
					</ul>
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

	export default {
		name: 'Nav',
		components: {
			"my-release": Release
		},
		data() {
			return {
				inputVal: "",
				// 导航栏数据，包括当前页面编号
				nowPageColor: "now-page-color",
				otherPageColor: "other-page-color",

				navData: {
					nowPage: "",
					navList: [{
							id: 0,
							title: "绘画",
							url: "/illust"
						},
						{
							id: 1,
							title: "关注"
						},
						{
							id: 2,
							title: "话题"
						},
						{
							id: 3,
							title: "写作",
							url: "/novel"
						}
					]
				},
				//搜索结果
				searchResult: [],
				isShowSearch: "none",
				isSelect:false//是否选择联想结果
			}
		},
		methods: {
			/* 
			    跳转
			*/
			goTo(goToPage) {

				this.$router.push(goToPage.url)

				this.$router.go(0)
			},
			/*
				搜索用户
			 */
			handleSearch() {
				let nickname = this.inputVal.trim()
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
			hiddenResult(isShow, isSelect) {
				if (this.isSelect == false) {
					this.isShowSearch = "none"
					this.searchResult = []
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
			/* 
				导航栏高亮显示当前页面
			 */
			let list = this.navData.navList
			for (let index = 0; index < list.length; index++) {
				if (list[index].url == this.$route.path) {
					this.navData.nowPage = index
				}
			}

		},

	}
</script>

<style scoped>
	#other-nav {
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

	/* 导航栏左侧 */
	.nav-left {
		display: flex;
		align-items: center;
	}

	.nav-logo {
		width: 115px;
		height: 39px;
		margin-right: 40px;
	}

	.item-list li {
		display: inline-block;
		margin: 0 20px;
	}

	.item-list li:hover {
		color: #fa4b8b;
	}

	.now-page-color {
		color: #fa4b8b;
		font-weight: 500;
	}

	.other-page-color {
		color: #252526;
	}


	/* 导航栏右侧 */
	.nav-right {
		display: flex;
		align-items: center;
	}

	.el-input {
		margin-right: 10px;
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

	.nav-right .el-button {
		font-size: 16px;
		width: 88px;
		height: 36px;
		padding: 0;
		box-sizing: border-box;
	}
</style>
