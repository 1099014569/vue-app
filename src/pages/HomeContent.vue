<template>
	<div class="homecontent">
		<div class="content-box">
			<div class="left demo-image__lazy">
				<div class="left-content" v-for="item in list" :key="item.id" lazy>
					<div class="left-headimg">
						<el-image style="width: 64px; height: 64px" :src="item.headimg" fit="fill" @click="jumpName(item.nickname)"></el-image>
					</div>
					<div class="list-right">
						<div class="back"></div>
						<div class="card">
							<el-card class="box-card" :body-style="{ padding: '3px 32px 28px' }" shadow="never">
								<el-tooltip placement="bottom-start">
									<NameHover :headimg="item.headimg" :nickname="item.nickname" :followlength="list.length" @jump-name="jumpName(item.nickname)"
									 :that="jump" slot="content"></NameHover>
									<span class="nickname" @click="jumpName(item.nickname)">{{item.nickname}}</span>
								</el-tooltip>
								<div class="card-content">
									<img :src="item.workimg">
									<!-- 查看大图 -->
									<!-- <el-dialog :visible.sync="dialogVisible">
									    <img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog> -->
									
									
									<div class="desc">{{item.work_desc}}</div>
								</div>
								<router-view :tags="item.tags" :like="item.work_like" :comment="item.work_comment" :share="item.work_share"></router-view>
							</el-card>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NameHover from "@/components/homecontent/NameHover"

	export default {
		name: "HomeContent",
		components: {
			NameHover
		},
		data() {
			return {
				list: [],
				jump: "",
				// 弹出大图的设置
				dialogImageUrl: "",
				dialogVisible: false,
			}
		},
		methods: {
			jumpName(nickname) {
				this.$router.push({
					path: "/user",
					query: {
						nickname
					}
				})
			},
            // 查看大图
            viewBigImg(workimg) {
                this.dialogImageUrl = workimg
                this.dialogVisible = true
            },
		},
		mounted() {
			
			let nickname = JSON.parse(localStorage.getItem("accountMes")).nickname
			this.jump = this;
			
			this.axios.get("http://localhost:8888/getfollow", {
				params: {
					nickname: nickname
				}
			}).then(response => {
				this.list = response.data
				let postData = this.$qs.stringify({
					nickname
				})
				this.axios.post("http://localhost:8888/following", postData)
					.then(res => {
						for(let j = 0; j < this.list.length;j++){
							for(let i = 0;i < res.data.length;i++){
								if(this.list[j].nickname == res.data[i].follow_nickname){
									let arr = res.data[i].user_tag.split("路");
									this.list[j].tags = arr;
								}
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped>
	.homecontent {
		width: 100%;
		background-color: #EDEDEF;
		padding-top: 15px;
	}

	.content-box {
		width: 928px;
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}

	.el-image {
		cursor: pointer;
	}

	.left-content {
		display: flex;
		justify-content: space-between;
		width: 674px;
		margin-bottom: 16px;
	}

	.list-right {
		width: 585px;
	}

	.back {
		height: 23px;
		background-image: url(../assets/homeimg.png);
		background-size: cover;
	}

	.card {
		padding-left: 23px;
	}

	.el-card {
		width: 560px;
		border-top: 0;
		border-radius: 0;
		box-shadow: 0px 9px 3px rgba(0, 0, 0, .1);
		margin: 0;
	}

	.nickname {
		color: #888;
		cursor: pointer;
		font-size: 14px;
	}

	.card-content {
		display: flex;
		margin: 16px 0;
	}

	.card-content img {
		width: 164px;
	}

	.desc {
		margin-left: 28px;
		color: #444;
	}
</style>
