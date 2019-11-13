<template>
	<div id="image-form">
		<div class="main-form">

			<h1>发布图片</h1>
			<el-form ref="form" :model="form" label-width="80px">

				<ul class="img-list">
					<li class="img-item" v-for="item_src in filelist">
						<img :src="item_src" alt="" srcset="">
					</li>
					<div class="add-work">
						<file-uploader :file-num-limit="9" @file-list="handleImg" :multiple="true"></file-uploader>
					</div>
				</ul>

				<div class="text">
					<p class="title">想说的话</p>
					<textarea name="" id="" cols="30" rows="10" style="resize: none;" v-model="form.desc" placeholder="畅所欲言~"></textarea>
				</div>

			</el-form>

		</div>
		<div class="btndiv">
			<el-button class="summit-btn" type="primary" @click="summitWork">提交发布</el-button>
		</div>


	</div>

</template>

<script>
	import WebUploader from "@/components/WebUploader";

	export default {
		name: 'ImageForm',
		data() {
			return {
				form: {
					desc: ""
				},
				filelist: []
			}
		},
		components: {
			"file-uploader": WebUploader
		},
		methods: {
			// 处理uploader成功上传的图片地址
			handleImg(imgUrl) {
				this.filelist.push(imgUrl);
			},
			// 提交作品
			summitWork() {

				if (this.filelist.length == 0) {
					this.$message({
						type: "error",
						message: "图片不能为空"
					})
					return
				}
				// 作品提交日期
				let date = new Date()
				date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` //年/月/日

				let workimg = this.filelist.join("$") //逗号分隔作品链接
				let id = new Date().getTime()

				let nickname = JSON.parse(localStorage.getItem("accountMes")).nickname
				let desc = this.form.desc.trim()
				desc = desc ? desc : "发布图片"
				let headimg = JSON.parse(localStorage.getItem("accountMes")).headimg;
				
				let postData = this.$qs.stringify({

					workimg: workimg,
					date: date,
					desc: desc,
					id,
					nickname,
					headimg
				})
				this.axios.post('http://localhost:8888/summit', postData)
					.then((response) => {
						this.$message({
							type:"success",
							message:"发布成功"
						})
						this.$router.push({path: "/"})
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},

	}
</script>

<style scoped>
	.main-form {
		width: 730px;
		margin: 18px auto 0;
		background: #fff;
		border-radius: 6px;
	}

	.main-form h1 {
		font-size: 18px;
		font-weight: 600;
		height: 50px;
		line-height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #EBECED;
		padding-left: 20px;
	}

	.el-form {
		padding: 30px 40px;


	}

	/* 图片 */
	.img-list {
		display: flex;
		flex-wrap: wrap;
		/* 抵消item多出来的5px */
		margin-left: -5px;
		margin-right: -5px;
	}

	.img-item {
		width: 122px;
		height: 180px;
		display: flex;
		align-items: center;
		margin: 0 5px 20px;
	}

	.img-item img {
		width: 122px;
	}

	/* 添加图片区域 */
	.add-work {
		height: 172px;
		display: flex;
		align-items: center;
	}

	.el-form textarea {
		width: 650px;
		height: 160px;
		border-radius: 6px;
		border: 1px solid #dcdfe6;
		padding: 10px 16px;
		box-sizing: border-box;
		font-family: "-apple-system", "Helvetica Neue", "PingFang SC", "\5fae\8f6f\96c5\9ed1", "\5B8B\4F53", "\9ED1\4F53", arial, sans-serif;
	}

	.el-form textarea:focus {
		outline: none;
		border-color: #999;
	}

	.title {
		padding: 16px 0 10px;
	}

	.el-form .summit-btn {
		border-radius: 6px;
		width: 150px;
		height: 40px;
		margin: 0;
	}

	.btndiv {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	#image-form .el-button {
		width: 170px;
		height: 40px;
		border-radius: 0;
	}
</style>
