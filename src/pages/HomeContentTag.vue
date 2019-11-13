<template>
	<div class="tagBox">
		<div class="left">
			<i class="el-icon-paperclip"></i>
			<router-link to="" v-for="item in tags">{{item}}</router-link>
		</div>
		<div class="right">
			
			<router-link to="">热度{{like == "点赞" ? "" : like}}</router-link>
			<router-link to="">评论{{comment == "评论" ? "" : comment}}</router-link>
			<router-link to="">分享{{share == "分享" ? "" : share}}</router-link>
			<router-link to="">推荐</router-link>
			<i class="el-icon-star-on" :class="{clickFabulous: isclickFabulous}" @click="tagLike"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			comment: String,
			share: String,
			tags : Array,
			like: String
		},
		name: "HomeContentTag",
		data() {
			return {
				isclickFabulous: false
			}
		},
		methods: {
			tagLike() {
				this.isclickFabulous = !this.isclickFabulous;
			}
		}
	}
</script>

<style scoped>
	.tagBox {
		line-height: 19px;
		color: #aaa;
		font-size: 12px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.tagBox a {
		color: #aaa;
		font-size: 12px;
		margin-left: 18px;
	}
	.tagBox a:hover{
		color: #7594b3;
	}
	a:first-of-type {
		margin-left: 4px;
	}

	a:last-of-type {
		margin-right: 18px;
	}
	.el-icon-star-on{
		display: inline-block;
		font-size: 16px;
	}
	.el-icon-star-on:hover{
		color: #7594b3;
	}
	.el-icon-star-on span{
		color: #aaa;
		font-size: 12px;
	}
	.clickFabulous{
		color: #D90000;
	}
	.clickFabulous:hover{
		color: #D90000;
	}
</style>
