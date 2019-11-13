<template>
	<div class="setting">
		<!-- 设置页面 -->
		<other-nav></other-nav>
		<div class="main">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="编辑资料" name="first">
					<editingmaterials @materials-change="changeCookie"></editingmaterials>
				</el-tab-pane>
				<el-tab-pane label="修改头像" name="second">
					<WebUploader :file-num-limit="1" @file-list="handleImg"></WebUploader>
					<div class="myheadimg">
						<img :src="imgUrl" alt="">
						<p>150x150像素预览</p>
					</div>
					<div class="message1">
						<input type="submit" @click="save" value="保存">
					</div>
				</el-tab-pane>
				<el-tab-pane label="修改密码" name="third">

					<changepw :account="account"></changepw>
				</el-tab-pane>
				<el-tab-pane label="免打扰设置" name="fourth">
					<disturb></disturb>
				</el-tab-pane>
			</el-tabs>
			<div class="leftnav">
				<!-- 用户头像 -->
				<div class="touxiang">
					<img :src="headimg" alt="">
				</div>
				<div class="message">
					<div class="myname">
						{{nickname}}
					</div>
					<div class="color-white">
						{{introduce}}
					</div>
					<div class="color-pink">
						查看简介
					</div>
					<div class="fans">
						<span>
							<router-link to="/follow">关注 30</router-link>
						</span>
						<span>
							粉丝 0
						</span>
					</div>
				</div>
				<div class="edit" @click="editMsg">
					编辑个人信息
				</div>
				<div class="personhome">
					<i class="el-icon-s-home"></i>
					<router-link to="/">个人主页</router-link>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import WebUploader from "@/components/WebUploader.vue"
	import axios from 'axios'

	import Editingmaterials from "@/components/accountSetting/Editingmaterials.vue"
	import Changepw from "@/components/accountSetting/Changepw.vue"
	import Disturb from "@/components/accountSetting/Disturb.vue"
	import OtherNav from "@/components/nav/OtherNav.vue"

	export default {
		name: "AccountSettings",
		components: {
			"editingmaterials": Editingmaterials,
			"changepw": Changepw,
			"disturb": Disturb,
			"WebUploader": WebUploader,
			"other-nav": OtherNav
		},
		data() {
			return {
				activeName: 'first',
				nickname: JSON.parse(localStorage.getItem("accountMes")).nickname,
				headimg: JSON.parse(localStorage.getItem("accountMes")).headimg,
				introduce: "",
				account: "",
				imgUrl: "" //预览图
			};
		},
		methods: {
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			editMsg() {
				this.activeName = "first"
			},
			handleImg(data) {
				this.imgUrl = data //webuploader返回头像地址
			},
			//个人资料页已修改昵称，更改当前的缓存值
			changeCookie(changeObj){
				this.nickname=changeObj.nickname;
				this.introduce=changeObj.introduce;
				localStorage.setItem("accountMes",JSON.stringify({
					nickname:changeObj.nickname,
					headimg:this.headimg
				}))
			},
			//提交修改头像
			save() {
				
				let postData = this.$qs.stringify({
					headimg: this.imgUrl,
					nickname: this.nickname
				})

				this.axios.post('http://localhost:8888/changeheadimg', postData)

					.then((response) => {
						this.$message({
							type: "success",
							message: "修改成功"
						})
						
						this.headimg=this.imgUrl
						
						//更改缓存数据
						
						localStorage.setItem("accountMes",JSON.stringify({
							nickname:"什么时候会画画了再把名字改回来",
							headimg:this.imgUrl
						}))
						
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
		mounted() {
			/* 请求账户信息 */
			let postData = this.$qs.stringify({
				nickname: this.nickname
			})
			this.axios.post('http://localhost:8888/account', postData)
				.then((response) => {
					this.account = response.data[0].account;
					this.introduce = response.data[0].intrduce;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
</script>
<style>
	.main {

		padding-top: 12px;

	}

	/* 修改头像模块 */
	#pane-second {
		padding: 60px 0;
	}

	.el-tab-pane .web-uploader {
		height: 126px;
		width: 126px;
		margin: 0 auto;
	}

	.myheadimg p {
		font-size: 12px;
		color: #999;
	}

	.myheadimg {
		width: 100px;
		margin: 0 auto;
		margin-top: 20px;
	}

	.el-tabs__item:hover {
		color: #ff6fa2 !important;
		cursor: pointer;
	}

	.el-tabs {
		margin-top: 12px;
	}

	.el-tabs__item.is-active {
		color: #ff6fa2 !important;
	}

	.el-tabs__nav-scroll {
		line-height: 50px;
		background-color: #fff;
		border-radius: 3px;
	}

	.el-tabs__active-bar {
		background-color: #ff6fa2 !important;
		height: 5px !important;
	}

	.el-tabs {
		width: 860px;
		margin: 0 auto;
		border-radius: 4px;
		box-sizing: border-box;
	}

	#pane-third {
		padding: 40px;
	}

	.el-tabs__item {
		font-size: 16px !important;
	}

	.el-tabs__nav-wrap::after {
		display: none;
	}

	.el-tabs__nav-scroll {
		line-height: 54px;
		padding-left: 50px;
	}

	.el-tab-pane {
		background: #fff;
	}

	.leftnav {
		width: 230px;
		position: fixed;
		top: 50px;
		left: 0;
		bottom: 0;
		transform: translateZ(0);
		background-color: #36343F;
		z-index: 10;
	}

	.touxiang {
		height: 100px;
		width: 100%;
	}

	.touxiang img {
		width: 70px;
		height: 70px;
		float: left;
		margin-left: 20px;
		margin-top: 20px;
		border-radius: 35px;
	}

	.myname {
		font-size: 18px;
		color: white;
		text-align: left;
		margin-left: 20px;
		margin-top: 10px;
	}

	.color-white {
		color: white;
		font-size: 12px;
		margin-left: 20px;
		text-align: left;
		margin-top: 10px;
	}

	.save {
		border-radius: 6px;
	}

	.color-pink {
		color: #ff5f98 !important;
		font-size: 12px;
		margin-left: 20px;
		text-align: left;
		margin-top: 3px;
	}

	.fans {
		margin: 0 auto;
		width: 190px;
		height: 17.6px;
		font-size: 14px;
		margin: 12px 0 20px;
		color: white;
		box-sizing: border-box;
	}

	.fans span {
		float: left;
		margin-left: 20px;
	}

	.fans a {
		color: #fff;
	}

	.edit {
		width: 190px;
		height: 32px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 32px;
		text-align: center;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.8);
		margin: 0 auto;
	}

	.personhome {
		width: 100%;
		height: 50px;
		line-height: 50px;
		color: #fff;
		margin-top: 40px;
		color: white;
		font-size: 14px;
		padding-left: 20px;
		box-sizing: border-box;
	}

	.personhome a {
		color: #fff;
		padding-left: 6px;
	}

	.personhome:hover {
		background-color: #4A3847;
	}

	.message1 {
		width: 680px;
		height: 100%;
		text-align: left;
		padding-left: 50px;
		margin: 100px 0 0 250px;
	}

	.message1 input {
		width: 300px;
		height: 44px;
		padding: 0 15px;
		font-size: 14px;
		border-radius: 4px;
		outline-color: #FFFFFF;
		border: 1px solid #e5e5e5;
		box-sizing: border-box;
		background-color: #FF6FA2;
		color: white;

	}

	.myheadimg img {
		width: 100px;
		height: 100px;
	}
</style>
