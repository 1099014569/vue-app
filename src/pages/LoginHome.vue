<template>
	<div class="box">
		<el-tabs type="border-card">
			<el-tab-pane label="注册">
				<el-button type="success" @click="register">邮箱注册</el-button>
			</el-tab-pane>
			<el-tab-pane label="登陆">
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
						<el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>



</template>

<script>
	export default {
		name: "LoginHome",
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
			};
		},

		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.axios.get("http://localhost:8888/login", {
							params: {
								name: this.ruleForm.email,
								passwd: this.ruleForm.checkPass
							}
						}).then(response => {
							if (response.data.code == 0) {
								this.$message({
									center: true,
									showClose: true,
									message: response.data.msg,
									type: 'error'
								});
							} else {
								this.$message({
									center: true,
									showClose: true,
									message: "登陆成功",
									type: 'success'
								});

								this.$router.push({
									path: "/"
								});
								//添加登录信息缓存
								localStorage.setItem("isLogin", true);
								localStorage.setItem("Flag", "isLogin")
								localStorage.setItem("accountMes", JSON.stringify({
									nickname: response.data.userMes.nickname,
									headimg: response.data.userMes.headimg
								}))
								this.$store.commit("login")

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
			register() {
				this.$router.push({
					path: "/register"
				})
			}
		},

	}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 650px;
		background-image: url(../assets/LoginHome.jpg);
		background-size: cover;
		z-index: -200;
		padding-top: 300px;
	}

	.el-button--success {
		width: 350px;
		background: #85ce61;
		border-color: #85ce61;
		margin-left: -96px;
		font-size: 18px;
	}

	.el-tab-pane>.el-button--success {
		margin-left: 10px;
	}

	.el-input {
		margin-left: -96px;
	}

	.el-tabs {
		width: 400px;
		margin: 0 auto;
	}

	.el-tabs__header {
		display: flex;
		justify-content: center;
	}

	#pane-0 {
		padding-top: 96px;
		height: 252px;
		box-sizing: border-box;
	}

	.el-tabs__header {
		display: flex;
		justify-content: center;

	}

	#tab-0,
	#tab-1 {
		width: 201px;
		text-align: center;
		font-size: 18px;
		height: 56px;
		line-height: 56px;
	}

	.el-tabs--border-card {
		border: 0 !important;
		background-color: rgba(17, 17, 17, 0.3) !important;
	}

	.el-tabs--border-card>.el-tabs__header {
		background-color: rgba(17, 17, 17, 0.1) !important;
	}

	.el-tabs__content {
		background-color: white;
		/* opacity: 0.5; */
	}

	.el-tabs__nav-scroll {
		padding: 0 !important;
		background-color: rgba(17, 17, 17, 0.1) !important;
	}

	.el-form-item__content {
		width: 350px;
		padding-left: 5px;
	}

	.el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
		color: white !important;
	}

	.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
		color: #444 !important;
	}





	.box>>>.el-tabs__header {
		display: flex;
		justify-content: center;

	}

	.box>>>#tab-0,
	.box>>>#tab-1 {
		width: 201px;
		text-align: center;
		font-size: 18px;
		height: 56px;
		line-height: 56px;
	}

	.box>>>.el-tabs--border-card {
		border: 0 !important;
		background-color: rgba(17, 17, 17, 0.3) !important;
	}

	.box>>>.el-tabs--border-card>.el-tabs__header {
		background-color: rgba(17, 17, 17, 0.1) !important;
	}

	.box>>>.el-tabs__content {
		background-color: white;
		/* opacity: 0.5; */
	}

	.box>>>.el-tabs__nav-scroll {
		padding: 0 !important;
		background-color: rgba(17, 17, 17, 0.1) !important;
	}

	.box>>>.el-form-item__content {
		width: 350px;
		padding-left: 5px;
	}

	.box>>>.el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
		color: white !important;
	}

	.box>>>.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
		color: #444 !important;
	}
</style>
