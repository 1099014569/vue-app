<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

			<div class="filebox">
				<file-uploader :file-num-limit="1" @file-list="handleImg" :multiple="true"></file-uploader>
				<img :src="headimg" class="file-headimg" v-if="headimg">
			</div>

			<el-form-item label="昵称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="地区" prop="region">
				<el-select v-model="ruleForm.region" placeholder="请选择地区">
					<el-option label="上海" value="shanghai"></el-option>
					<el-option label="北京" value="beijing"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="性别" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="个人简介" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="next('ruleForm')">下一步</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import WebUploader from "@/components/WebUploader"
	export default {
		components: {
			"file-uploader": WebUploader
		},
		props: {
			active: Number,
			obj: Object,
		},
		data() {
			return {
				headimg: '',
				ruleForm: {
					name: '',
					region: '',
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择地区',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写个人简介',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			handleImg(urlimg) {
				this.headimg = urlimg;
			},
			//点击下一步的逻辑处理
			next(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let postData = this.$qs.stringify({
							username: this.obj.email,
							passwd: this.obj.pass,
							nickname: this.ruleForm.name,
							headimg: this.headimg,
							sex: this.ruleForm.resource,
							introduce: this.ruleForm.desc,
							location: this.ruleForm.region,
							active: this.active
						})
						this.axios.post('http://localhost:8888/register', postData).then(response => {
							if (response.data.code == 1) {
								let x = this.active;
								x = x + 1;
								this.$emit('giveActive', x);
							} else {
								this.$message({
									center: true,
									showClose: true,
									message: response.data.msg,
									type: 'error'
								});
							}
						}).catch(response => {
							this.$message({
								center: true,
								showClose: true,
								message: "发送Ajax请求失败",
								type: 'error'
							});
						})
					} else {
						this.$message({
							center: true,
							showClose: true,
							message: "请正确输入内容",
							type: 'error'
						});
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.el-upload__tip {
		text-align: center;
	}

	.el-button--primary {
		width: 350px;
		font-size: 18px;
		margin-left: 40px;
	}

	.el-button--success {
		width: 350px;
		font-size: 18px;
		margin-left: -40px;
	}

	.filebox{
		display: flex;
		justify-content: center;
		align-content: center;
	}
	.web-uploader{
		width: 126px;
	}
	.file-headimg{
		width: 110px;
		height: 110px;
		margin-left: 16px;
	}
	
	 
</style>
