<template>
	<div class="StepThree-box">
		<i class="el-icon-circle-check"></i>
		<div class="secessful">成功</div>
		<el-button type="success" @click="next">下一步</el-button>
	</div>
	
</template>

<script>
	export default {
		name: "StepThree",
		methods: {
			next() {
				//跳转至登录页
				this.$router.push("/loginhome")
			}
		},
	}
</script>

<style scoped>
	.StepThree-box{
		text-align: center;
		color: #67C23A;
	}
	.el-icon-circle-check{
		font-size: 100px;
	}
	.secessful{
		font-size: 20px;
	}
	.el-button--success {
		width: 350px;
		font-size: 18px;
	}
</style>
