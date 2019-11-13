<template>
	<!-- 个人主页 -->
	<div class="big">
		<my-nav></my-nav>
		<div class="big-box">
			<div class="person">
				<el-card shadow="hover" :body-style="{ padding:'0' }">
					<div class="back"></div>
					<div class="down">
						<div class="headimg">
							<img :src="headimg">
						</div>
						<div class="top">
							<div class="more">...</div>
							<div class="private">私信</div>
							<div class="follow" @click="follow" v-if="isfollow">关注 TA</div>
							<div class="already-follow" @click="follow" v-else>已关注</div>
						</div>
						<div class="personname">{{nickname}}</div>
						<div class="persontag">
							<span class="sex">♀</span>
							<span>深宅</span>
							<span>哲学家</span>
						</div>
						<div class="asid">
							<div class="asid-follow">
								<span>3</span>
								<span class="thin-txt">关注</span>
							</div>
							<div class="asid-follow">
								<span>358</span>
								<span class="thin-txt">粉丝</span>
							</div>
							<div class="asid-follow">
								<span>3122</span>
								<span class="thin-txt">获赞</span>
							</div>
						</div>
						<div class="person-footer">
							<span class="release">TA的发布</span>
							<span class="person-like" @click="jumpFollow()">TA的关注</span>
						</div>
					</div>
				</el-card>
			</div>
			<div v-for="item in list" :key="item.id" class="content-box">
				<el-card shadow="hover" :body-style="{ padding: '16px 20px 0' }">
					<div class="time">{{item.work_date}}</div>
					<div class="information">
						<div class="block">
							<el-avatar style="position: static;" :size="50" :src="headimg"></el-avatar>
						</div>
						<div class="info-right">
							<div class="name-box">
								<span class="username">{{item.nickname}}</span>
								<span class="intrduce">{{item.work_desc}}</span>
							</div>

							<el-card class="box-card" :body-style="{ padding: '0' }" shadow="never">
								<div class="img-box">
									<img class="img-big" :src="item.workimg"
									 alt="">
									<div class="img-small">
										<img :src="item.workimg">
										<img :src="item.workimg">
									</div>
								</div>

							</el-card>
							<div class="tags">
								<span>OC</span>
								<span>模板</span>
							</div>
							<div class="footer">
								<div class="collection" @click="isCollection">
									<i :class="collection.iscollection ?'el-icon-star-off' : 'el-icon-star-on' "></i>
									<span> {{collection.collectiontext}}</span>
								</div>
								<div class="collection">
									<el-tooltip placement="top-start" effect="light">
										<el-button>
											<i class="el-icon-share"></i>
											<span> 分享</span>
										</el-button>
										<div slot="content" class="shareBox">
											<i class="el-icon-picture-outline-round"></i>
											<i class="el-icon-picture-outline-round"></i>
											<i class="el-icon-picture-outline-round"></i>
											<i class="el-icon-picture-outline-round"></i>
										</div>
									</el-tooltip>
								</div>
								<div class="collection">
									<i class="el-icon-s-comment"></i>
									<span> {{item.comment}}</span>
								</div>
								<div class="collection">
									<i class="el-icon-view"></i>
									<span> {{item.share}}</span>
								</div>
							</div>
						</div>

					</div>
				</el-card>
			</div>
		</div>
	</div>

</template>

<script>
	import Nav from "@/components/nav/Nav.vue"
	
	export default {
		name: 'HomePageContent',
		components:{
			"my-nav":Nav
		},
		data() {
			return {
				nickname: "",
				headimg: "",
				isfollow: true,
				collection: {
					iscollection: true,
					collectiontext: "收藏"
				},
				list: []
			}
		},
		
		methods: {
			isCollection() {
				this.collection.iscollection = !this.collection.iscollection;
				if (!this.collection.iscollection) {
					this.collection.collectiontext = "已收藏";
					this.$message({
						center: true,
						showClose: true,
						message: '收藏成功',
						type: 'success'
					});
				} else {
					this.collection.collectiontext = "收藏";
					this.$message({
						center: true,
						showClose: true,
						message: '已取消收藏',
						type: 'success'
					});
				}
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
				this.$router.push({
					path: "/follow",
					query: {
						nickname: this.nickname
					}
				})
			}
		},
		mounted() {
			
			this.nickname = this.$route.query.nickname;
	
			this.axios.get("http://localhost:8888/getpersoninfo",
				{
					params: { nickname: this.nickname}
				}
			).then(response => {
				this.list = response.data;
				this.headimg=response.data[0].headimg
			}).catch(err => {
				console.log(err)
			})
			
		}
	}
</script>

<style scoped>
	.person {
		width: 640px;
		position: relative;
	}

	.down {
		padding: 14px 20px;
	}

	.headimg {
		position: absolute;
		top: 90px;
		width: 140px;
		height: 140px;
	}

	.headimg img {
		width: 140px;
		height: 140px;
		border-radius: 140px;
	}

	.back {
		height: 160px;
		background: url("https://s3.pstatp.com/bcy/image/default_banner.c6e8da.jpg");
		background-size: cover;
	}

	.top {
		display: flex;
		text-align: center;
		line-height: 36px;
		flex-direction: row-reverse;
	}

	.top div {
		height: 36px;
		border-radius: 6px;
		font-size: 14px;
		box-sizing: border-box;
		cursor: pointer;
	}

	.follow {
		width: 88px;
		background-color: #fa4b8b;
		border: 1px solid #fa4b8b;
		color: white;
	}

	.follow:hover {
		background-color: white;
		color: #fa4b8b;
	}

	.already-follow {
		width: 88px;
		background-color: #f5f5fa;
		color: #a1a1a6;
	}

	.private {
		width: 60px;
		border: 1px solid #e9e9f0;
		margin: 0 12px;
	}

	.more {
		width: 36px;
		border: 1px solid #e9e9f0;
	}

	.personname {
		font-size: 22px;
		font-weight: 600;
		color: #252526;
		margin-top: 40px;
	}

	.persontag {
		display: flex;
		margin: 10px 0 40px;
	}

	.persontag span {
		height: 20px;
		padding: 0 6px;
		margin-right: 8px;
		border: 1px solid #f0f0f7;
		border-radius: 4px;
		background-color: #f5f5fa;
		font-size: 12px;
		line-height: 18px;
		color: #575759;
	}

	.persontag .sex {
		color: rgb(251, 78, 78);
	}

	.asid {
		display: flex;
		margin-bottom: 16px;
	}

	.asid .asid-follow {
		margin-right: 32px;
		font-size: 18px;
		font-weight: 500;
		line-height: 20px;
		color: #252526;
	}

	.thin-txt {
		font-size: 16px;
		font-weight: 400;
		color: #a1a1a6;
		vertical-align: text-bottom;
	}

	.person-footer {
		display: flex;
	}

	.person-footer span {
		cursor: pointer;
		width: 300px;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		text-align: center;
	}

	.release {
		color: #fa4b8b;
	}

	.person-like:hover {
		color: #fa4b8b;
	}


	/* 循环内容 */
	.big {
		width: 100%;
		background-color: #F5F5FA;
		padding-top: 60px;
	}

	.big-box {
		width: 960px;
		margin: 0 auto;
	}

	.content-box {
		width: 640px;
		margin-top: 10px;
	}

	.time {
		color: #a1a1a6;
		font-size: 12px;
		margin-bottom: 15px;
	}

	.information {
		display: flex;
	}

	.info-right {
		margin-left: 12px;
	}

	.name-box {
		display: flex;
		flex-direction: column;
		font-size: 14px;
		font-weight: 600;
		color: #252526;
		margin-left: 12px;
	}

	.username:hover {
		text-decoration: underline;
	}

	.intrduce {
		color: #252526;
		font-weight: 400;
		margin: 10px 0;
	}

	.intrduce:hover {
		color: #575759;
	}

	.img-box {
		display: flex;
	}

	.img-big {
		width: 354px;
	}

	.img-small {
		display: flex;
		flex-direction: column;
	}

	.img-small img {
		width: 177px;
	}

	.tags {
		display: flex;
		margin-top: 12px;
		margin-bottom: 16px;
	}

	.tags span {
		width: 42px;
		height: 28px;
		line-height: 28px;
		color: #575759;
		text-align: center;
		background-color: #f5f5fa;
		border-radius: 6px;
		margin-right: 10px;
		font-size: 12px;
	}

	.el-icon-star-off {
		font-size: 20px;
	}

	.el-icon-star-on {
		font-size: 24px;
		color: #fa4b8b;
	}

	.footer {
		display: flex;
		height: 20px;
		line-height: 20px;
		color: #a1a1a6;
		margin-bottom: 16px;
	}

	.footer div {
		margin-right: 72px;
	}

	.footer div:hover {
		color: #575759;
	}

	.footer span {
		font-size: 14px;
	}

	.el-button {
		color: #a1a1a6;
		border: 0;
		padding: 0;
	}

	.el-button:focus,
	.el-button:hover {
		color: #575759;
		background-color: white;
	}

	.shareBox {
		text-align: center;
		line-height: 3.5;
	}

	.el-icon-picture-outline-round {
		font-size: 26px;
		margin-right: 10px;
	}

	.el-icon-picture-outline-round:hover {
		color: #F56467;
	}
</style>
