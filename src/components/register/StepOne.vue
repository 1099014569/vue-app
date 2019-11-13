<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-dynamic">
		<el-form-item prop="email" :rules="[
	        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
	        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
	      ]">
			<el-input v-model="ruleForm.email" placeholder="请输入邮箱名"></el-input>
		</el-form-item>
		<el-form-item prop="pass">
			<el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" autocomplete="off" show-password></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入密码" autocomplete="off" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="success" @click="next('ruleForm')">下一步</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "StepOne",
		props: {
			active: Number
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					domains: [{
						value: ''
					}],
					email: '',
					pass: '',
					checkPass: '',
					age: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},

		methods: {
			next(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let postData = this.$qs.stringify({
						    username: this.ruleForm.email,
						    active: this.active
						})
						this.axios.post('http://localhost:8888/register',postData
						).then(response => {
							if (response.data.code == 1) {
								let obj = {
									email: this.ruleForm.email,
									pass: this.ruleForm.pass
								}
								this.$emit('giveEmail', obj)
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
			},
		}


	}
</script>


<style scoped>
	.el-input {
		margin-left: -96px;
	}

	.el-button--success {
		width: 350px;
		font-size: 18px;
		margin-left: -96px;
	}
</style>
