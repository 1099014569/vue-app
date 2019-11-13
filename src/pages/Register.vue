<template>
	<div class="big">
		<div class="top">
			<a class="top-content" href="https://haoma.163.com/" target="_blank"></a>
		</div>

		<div class="register-box">
			<div class="register-content">
				<el-steps :active="active" finish-status="success">
					<el-step title="步骤 1"></el-step>
					<el-step title="步骤 2"></el-step>
					<el-step title="步骤 3"></el-step>
				</el-steps>

				<StepOne v-if="active==0" :active="active" @giveActive="getActive" @giveEmail="getEmail"></StepOne>
				<StepTwo v-if="active==1" :active="active" :obj="obj" @giveActive="getActive1"></StepTwo>
				<StepThree v-if="active==2"></StepThree>

			</div>
		</div>

	</div>


</template>

<script>
	import StepOne from "@/components/register/StepOne";
	import StepTwo from "@/components/register/StepTwo";
	import StepThree from "@/components/register/StepThree";

	export default {
		name: "Register",
		components: {
			StepOne,
			StepTwo,
			StepThree
		},
		data() {
			return {
				active: 0,
				obj:{}
			}
		},
		methods: {
			getActive(value){
				this.active = value;
			},
			getEmail(value){
				this.obj = value;
			},
			getActive1(value){
				this.active = value;
			}
			
		}
	}
</script>

<style scoped>
	.big{
		background-color: #F8F8F8;
		/* height: 728px; */
	}
	.top{
		width: 100%;
		background-color: white;
	}
	.top-content {
		display: block;
		width: 1100px;
		height: 64px;
		margin: 0 auto;
		margin-bottom: 22px;
		background: url(../assets/register.png);
		background-size: contain;
		background-position-y: 2px;
	}

	.register-box {
		width: 1100px;
		height: 628px;
		margin: 0 auto;
		padding: 60px;
		box-sizing: border-box;
		background-color: white;
	}

	.register-content {
		width: 440px;
		margin: 0 auto;
	}

	.el-button--success {
		width: 350px;
		font-size: 18px;
		margin-left: 40px;
	}

	.demo-dynamic {
		padding-left: 30px;
	}
	
	.big >>> .el-form-item__content {
		width: 350px;
		padding-left: 5px;
	}
	
</style>
