<template>
	<div class="box">
		<div class="nav">
			<div class="navLeft">
				<div @click="jumpName(nickname)" class="headimg-box">
					<el-avatar shape="square" :size="30" :src="headimg"></el-avatar>
				</div>
				<div class="information">
					<p @click="jumpName(nickname)">{{nickname}}</p>
					<div class="infoFooter">
						<span class="change" @click="jumpName(nickname)">文章112</span>
						<span class="like change">喜欢444</span>
						<span class="change" @click="jumpFollow()">关注{{followlength}}</span>
					</div>
				</div>
			</div>

			<div class="navRight">
				<i class="el-icon-s-custom"></i>
				<i class="el-icon-caret-bottom"></i>
				<el-button @click="follow" v-if="isfollow" type="success" size="small">+关注</el-button>
				<el-button @click="follow" v-else type="info" size="small">已关注</el-button>
			</div>

		</div>

		<div class="content">

			<el-image v-for="item in workimglist" fit="fill" :src="item"></el-image>
		</div>
		<div class="footer">
			<span>更多相似达人：</span>
			<span class="change">繁花为君开</span>
			<span>、</span>
			<span class="change">致死量</span>
			<span>、</span>
			<span class="change">白墨就是白墨啊</span>
		</div>
	</div>



</template>

<script>
	export default {
		name: "NameHover",
		props: {
			nickname: String,
			followlength: Number,
			headimg:String,
			that: Object
		},
		data() {
			return {
				isfollow: true,
				workimglist: []
			}
		},
		methods: {
			jumpName(nickname) {
				this.$emit("jump-name")
			},
			follow() {
				this.isfollow = !this.isfollow;
				if (!this.isfollow) {
					this.$message({
						center: true,
						showClose: true,
						message: '关注成功',
						type: 'success'
					});
				} else {
					this.$message({
						center: true,
						showClose: true,
						message: '已取消关注',
						type: 'success'
					});
				}
			},
			jumpFollow(){
				this.that.$router.push({
					path: "/follow",
					query: {
						nickname: this.nickname
					}
				})
			}
		},
		mounted() {
			this.axios.get("http://localhost:8888/getpersoninfo", {
				params: {
					nickname: this.nickname
				}
			}).then(response => {
				if (response.data.length >= 3) {
					for (let i = 0; i < 3; i++) {
						this.workimglist.push(response.data[i].workimg);
					}
				} else if (response.data.length == 2) {
					for (let i = 0; i < 2; i++) {
						this.workimglist.push(response.data[i].workimg);
					}
				} else {
					for (let i = 0; i < response.data.length; i++) {
						this.workimglist.push(response.data[i].workimg);
					}
				}

			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.box {
		padding: 8px;
	}

	.nav {
		display: flex;
		justify-content: space-between;
	}

	.navLeft {
		display: flex;
		align-items: center;
	}

	.headimg-box {
		cursor: pointer;
	}
	.el-avatar{
		top: 20px;
		margin-left: 0;
	}
	.userImg {
		width: 40px;
		height: 40px;
	}

	.information {
		margin-left: 38px;
		font-size: 12px;
	}

	.information p {
		cursor: pointer;
		color: #ccc;
	}

	.information span {
		cursor: pointer;
		color: #888888;
	}

	.information .like {
		margin: 0 14px;
	}

	.el-icon-s-custom {
		font-size: 18px;
	}

	.el-icon-caret-bottom {
		font-size: 14px;
	}

	.el-button--success {
		margin-left: 12px;
	}

	.el-button--info {
		background-color: #333333;
		border: 1px solid #333333;
		margin-left: 12px;
	}

	.el-button--info:hover {
		background-color: #333333;
		border: 1px solid #333333;
	}

	.el-avatar--square {
		border-radius: 0;
	}

	.content {
		width: 100%;
		margin-top: 12px;
		margin-bottom: 30px;
	}

	.content .el-image {
		width: 128px;
		height: 96px;
	}
	
	.change {
		cursor: pointer;
	}

	.change:hover {
		color: white;
	}

	.el-image:nth-last-of-type(2) {
		margin: 0 10px;
	}

	.footer {
		color: #666666;
		font-size: 12px;
	}
</style>
