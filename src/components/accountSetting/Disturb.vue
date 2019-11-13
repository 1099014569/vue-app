<template>
	<div class="box">
		<div class="wapper mytop">
			<div class="message">我可以被哪些人勾搭</div>
			<div class="item">
				<input type="radio" name="gouda" checked="checked">所有人
			</div>
			<div class="item">
				<input type="radio" name="gouda">所有人（禁止匿名）
			</div>
			<div class="item">
				<input type="radio" name="gouda">我的粉丝（禁止匿名）
			</div>
			<div class="item">
				<input type="radio" name="gouda">禁止任何人勾搭我
			</div>
		</div>
		<div class="wapper">
			<div class="message">我可以收到那些人的私信</div>
			<div class="item">
				<input type="radio" name="sixin" checked="checked">我关注的人（以及官方账号）
			</div>
			<div class="item">
				<input type="radio" name="sixin">所有人
			</div>
		</div>
		<div class="wapper">
			<div class="save" @click="Submission">提交</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "disturb",
		methods:{
			Submission:function(){
				alert("提交成功")
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
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.wapper{
		width: 798px;
		margin: 0 0 30px 22px;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		text-align: left;
	}
	.mytop{
		margin-top: 50px;
	}
	.message{
		font-size: 14px;
		color: #333333;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.save{
		border: 1px solid #FF6FA2;
		background-color:#FF6FA2 ;
		color: white;
		font-size: 14px;
		width: 300px;
		height: 44px;
		margin: 0 auto;
		border-radius: 4px;
		text-align: center;
		line-height: 44px;
	}
	.item{
		display: flex;
		align-items: center;
	}
	.item input{
		margin-right: 6px;
	}
	
</style>
