<template>
	<div class="box">
		<div class="username">
			<div class="describe">站内昵称</div>
			<div class="message">
				<input type="text" v-model="nickname">
				<p>请输入4-30位字符，支持中英文、数字、下划线或中划线</p>
				<p>修改昵称会造成已发布动态中@你的昵称失效</p>
			</div>
		</div>
		<div class="region">
			<div class="describe">地区</div>
			<div class="message">
				<select v-model="prov" @change="updataCity();updataSub()">
					<option v-for='v in arr'>{{v.name}}</option>
				</select>

				<!-- 市 -->
				<select v-model="city" v-if="city">
					<option v-for='v in cityArr'>{{v.name}}</option>
				</select>

			</div>
		</div>
		<div class="sex">
			<div class="describe">性别</div>
			<div class="message">
				<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-radio-group v-model="ruleForm.resource">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="profile">
			<div class="describe">个人简介</div>
			<div class="message">
				<textarea placeholder="最多输入100字" v-model="introduce"></textarea>
			</div>
		</div>
		<!-- 占位置的 -->
		<div class="profile">
			<div class="describe">身份标签</div>
			<div class="message">
				<textarea placeholder="最多输入100字"></textarea>
			</div>
		</div>
		<div class="savebox">
			<div class="describe"></div>
			<div class="message">
				<input class="save" type="submit" @click="changemessage">
			</div>
		</div>
	</div>




</template>

<script>
	import axios from 'axios'
	var array = [{
			name: '请选择',
			sub: [{
				name: '请选择'
			}]
		},
		{
			name: '北京',
			sub: [{
				name: '北京',
				sub: ['大兴区', '东城区', '朝阳区']
			}]
		},
		{
			name: '四川省',
			sub: [{
				name: '成都市',
				sub: ['双流区', '新都区', '成华区', '高新区', '青羊区', '锦江区']
			}, {
				name: '遂宁市',
				sub: ['船山区', '大英县', '安居区', '射洪县', '蓬溪县']
			}, {
				name: '自贡市',
				sub: ['大安区', '自流井区', '贡井区', '沿滩区', '荣县', '富顺区']
			}, {
				name: '泸州市',
				sub: ['江阳区', '纳溪区', '龙马潭区', '泸县', '合江县', '叙永县', '古蔺区']
			}, ]
		},
		{
			name: '广东省',
			sub: [{
				name: '广州市',
				sub: ['越秀区', '荔湾区', '天河区', '海珠区', '黄埔区']
			}, {
				name: '深圳市',
				sub: ['福田区', '南山区', '宝安区', '龙岗区']
			}, {
				name: '珠海市',
				sub: ['香洲区', '金湾区']
			}, {
				name: '汕头市',
				sub: ['金平区', '濠江区', '潮南区', '龙湖区']
			}, {
				name: '佛山市',
				sub: ['禅城区', '三水区', '南海区']
			}]
		},
		{
			name: '上海市',
			sub: [{
				name: '上海市',
				sub: ['普陀区', '静安区', '杨浦区', '黄浦区', '南汇区', '嘉定区', '徐汇区']
			}]
		}
	]
	export default {
		name: "editingmaterials",
		props: {
			//用户信息
			materials: {
				type: Object
			}
		},
		data() {
			return {
				activeName: 'first',
				//用户信息
				ruleForm: {
					resource: ""
				},
				arr: array,
				nickname: JSON.parse(localStorage.getItem("accountMes")).nickname,
				oldNickname: JSON.parse(localStorage.getItem("accountMes")).nickname, //用于查询语句条件
				introduce: "",
				prov: '', //被选择的省
				cityArr: [], //选择对应省的市数据
				city: '', //被选择的市
				sub: '', //被选择的区
				subArr: [], //选择对应市的区数据
			}
		},
		methods: {
			updataCity: function() {

				//在重新选择省的时候，清除之前的被选择的区数据,如果在选择省的时候只调用这个方法时，
				//可以采取将三级区数据置空，这样三级选择框就不会出现，否则会出现省市变化了区未变的情况
				// this.sub='';    

				//此demo中，在选择省时，我采用的是调用两个方法
				//给cityArr[]赋值
				this.arr.forEach((item, index) => {
					if (item.name == this.prov) {
						this.cityArr = item.sub;
					}
				});
				//初始化默认值
				this.city = this.cityArr[0].name;
			},
			//更新区数据
			updataSub: function() {
				this.cityArr.forEach((item, index) => {
					if (item.name == this.city) {
						this.subArr = item.sub;
					}
				});
				this.sub = this.subArr[0];
			},

			//提交修改信息
			changemessage: function() {

				let postData = this.$qs.stringify({
					nickname: this.nickname,
					oldNickname: this.oldNickname,
					sex: this.ruleForm.resource,
					introduce: this.introduce,
					location: this.prov
				})

				this.axios.post("http://localhost:8888/changematerials", postData)

					.then(response => {

						this.$message({
							type: "success",
							message: "修改成功"
						})

						//向父组件传递值，让父组件更改缓存中用户信息
						if (this.nickname != this.oldNickname) {
							this.$emit("materials-change", {
								nickname: this.nickname,
								introduce: this.introduce
							})
						}

					})
					.catch(error => {
						console.log(error)
					})

			}
		},
		mounted() {

			//初始表单
			/* 请求账户信息 */
			let postData = this.$qs.stringify({
				nickname: this.nickname
			})
			this.axios.post('http://localhost:8888/account', postData)
				.then((response) => {

					this.introduce = response.data[0].intrduce;
					this.ruleForm.resource = response.data[0].sex

				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
</script>
<style scoped>
	.box {
		margin-top: 5px;
		width: 860px;
		background-color: white;
		box-sizing: border-box;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
	}

	.username {
		display: flex;
		width: 780px;
		margin: 0 auto;
		margin-top: 50px;
	}

	.username input {
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		padding: 0 0 0 5px;
		font-size: 14px;
		color: #333;
		width: 414px;
		height: 28px;
		line-height: 24px;
	}

	.describe {
		width: 180px;
		height: 100%;
		text-align: right;

	}

	.message {
		width: 600px;
		height: 100%;
		text-align: left;
		padding-left: 50px;
	}

	.message p {
		color: #999999;
		font-size: 12px;
		margin: 0;
	}

	.region {
		display: flex;
		width: 780px;
		margin: 0 auto;
		margin-top: 20px;

	}

	.region select {
		height: 22px;
		font-size: 14px;
		width: 107px;
		margin-left: 2px;
	}

	input,
	button,
	select,
	textarea {
		outline-color: #FFFFFF;
	}

	.sex {
		display: flex;
		width: 780px;
		margin: 0 auto;
		margin-top: 50px;
	}

	.sex .message {
		display: flex;
	}

	.sex .message input {
		margin-right: 10px;
		background-color: #FF0000;
	}

	.profile {
		display: flex;
		width: 780px;
		margin: 0 auto;
		margin-top: 50px;
	}

	textarea {
		width: 414px;
		height: 100px;
		padding: 10px 15px;
		border-radius: 4px;
	}

	.save {
		width: 126px;
		height: 50px;
		background-color: #FF6FA2;
		border: 1px solid #ff6fa2;
		font-size: 18px;
		color: white;
	}

	.savebox {
		display: flex;
		width: 780px;
		margin: 0 auto;
		margin-top: 50px;
		margin-bottom: 50px;
	}
</style>
