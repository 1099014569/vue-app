<template>
	<div id="text-form">
		<div class="main-form">
			<el-form>
				<div class="content-title">
					<h1>发布文字</h1>

				</div>
				<div class="content">
					<input class="input-title" v-model="form.inputTitle" placeholder="请输入标题"></input>
					<div class="text">
						<textarea cols="30" rows="10" style="resize: none;" v-model="form.desc" placeholder="畅所欲言~">
                        </textarea>
						<p class="tips">正文共 {{descCount}} 个字</p>
					</div>
				</div>
			</el-form>

		</div>
		<div class="btndiv">
			<el-button class="summit-btn" type="primary" @click="summit">提交发布</el-button>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'ImageForm',
		data() {
			return {

				form: {
					inputTitle: "",
					desc: "",
				}
			}
		},
		computed: {
			//计算正文字数
			descCount() {
				return this.form.desc.trim().length
			}
		},
		methods: {
			//提交作品
			summit() {

				let desc = this.form.desc.trim() //清除前后空格

				if (desc == "") {
					this.$message({
						type: "error",
						message: "文章正文不能为空"
					})
					return
				}
				// 作品提交日期
				let date = new Date()
				date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` //年/月/日

				let id = new Date().getTime()

				let nickname = JSON.parse(localStorage.getItem("accountMes")).nickname
				desc = `${this.form.inputTitle}
				${desc}
				`

				let postData = this.$qs.stringify({

					date: date,
					desc,
					id,
					nickname
				})
				this.axios.post('http://localhost:8888/summit', postData)
					.then((response) => {
						this.$message({
							type:"success",
							message:"发布成功"
						});
						this.$router.push({path: "/"});
					})
					.catch(function(error) {
						console.log(error);
					});
			}

		}

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

	/* 文章标题 */
	.input-title {
		width: 660px;
		height: 88px;
		border: 0;
		font-size: 36px;
		color: #999;
		font-weight: bold;
		border-bottom: 1px solid #ddd;
	}

	.input-title:focus {
		outline: none;
		color: #333;
	}

	/* 表单内容区 */
	.content {
		padding: 30px 40px;
	}

	.el-form textarea:focus {
		outline: none;
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

	.el-form textarea {
		width: 650px;
		height: 300px;
		border-radius: 6px;
		margin-top: 10px;
		border: 1px solid #dcdfe6;
		padding: 10px 16px;
		box-sizing: border-box;
		font-family: "-apple-system", "Helvetica Neue", "PingFang SC", "\5fae\8f6f\96c5\9ed1", "\5B8B\4F53", "\9ED1\4F53", arial, sans-serif;
	}

	.tips {
		color: #ccc;
	}

	/* 发布按钮 */
	.btndiv {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	#text-form .el-button {
		width: 170px;
		height: 40px;
		border-radius: 0;
	}
</style>
