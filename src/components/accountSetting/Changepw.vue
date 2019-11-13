<template>
	<div class="box">
		<el-form>
			<div class="phone">
				<div class="describe">绑定邮箱</div>
				<div class="message firstmage">{{account}}</div>
			</div>
			<div class="phone">
				<div class="describe">新密码</div>
				<div class="message">
					<input type="password" v-model="passwd">
				</div>
			</div>
			<div class="phone">
				<div class="describe">确认密码</div>
				<div class="message">
					<input type="password" v-model="repasswd">
					<div v-if="show" class="tishi">两次密码不一致，请重新输入</div>
				</div>
			</div>
			<div class="phone">
				<div class="describe"></div>
				<div class="message">
					<input class="changepw" @click="changepw()" type="submit" value="确认修改密码">
				</div>
			</div>
		</el-form>

	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: "changepw",
		data() {
			return {
				passwd: "",
				repasswd: "",
				show: false
			};
		},
		props: {
			account: {
				type: String
			}
		},
		methods: {
			changepw: function() {
				if(this.passwd!=this.repasswd){
					this.show=true;//提示用户密码不一致
					return
				}
				
				let nickname=JSON.parse(localStorage.getItem("accountMes")).nickname
				let postData=this.$qs.stringify({
					nickname,
					passwd:this.passwd
				})
				this.axios.post("http://localhost:8888/changepasswd",postData)
					.then(response=>{
						this.$message({
							type:"success",
							message:"修改成功"
						})
					})
					.catch(error=>{
						console.log(error)
					})
				
				
				/* if (this.$data.passwd === this.$data.repasswd) {
					this.$data.show = false
					axios.post("http://localhost:8888/changemessage", {
						name: this.$store.state.name,
						passwd: this.$data.passwd,
					}, {
						transformRequest: [
							function(data) {
								let params = '';
								for (let index in data) {
									params += index + "=" + data[index] + "&";
								}
								return params;
							}
						]
					}).then(response => {

						this.mydata = response.data;
						alert("修改成功")

					}).catch(response => {
						console.log("post发送Ajax请求失败");
					})

				} else {
					this.$data.show = true
				} */
			}
		}
	}
</script>

<style scoped>
	.box {
		margin-top: 5px;
		width: 860px;
		background-color: white;
		box-sizing: border-box;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
	}

	.phone {
		display: flex;
		width: 780px;
		margin: 0 auto;
		margin-top: 20px;
	}

	.describe {
		width: 100px;
		height: 44px;
		line-height: 44px;
		height: 100%;
		text-align: right;

	}

	.message {
		width: 680px;
		height: 100%;
		text-align: left;
		padding-left: 50px;
	}

	.message input {
		width: 300px;
		height: 44px;
		padding: 0 15px;
		font-size: 14px;
		border-radius: 4px;
		outline-color: #FFFFFF;
		border: 1px solid #e5e5e5;
		box-sizing: border-box;

	}

	.message input :focus {
		border: 1px solid #FF6FA2;
	}

	.firstmage {
		height: 44px;
		line-height: 44px;
	}

	.changepw {
		background-color: #FF6FA2;
		color: white;
		width: 300px;
		height: 44px;
	}

	.tishi {
		color: #FF0000;
		font-size: 10px
	}
</style>
