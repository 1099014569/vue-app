<template>
	<div>
		<!-- 轮播组件 -->
		<div class="carousel">
			<el-carousel height="150px">
				<el-carousel-item v-for="(x,index) in item" :key="index">
					<img class="small" :src="x.Img">
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>

</template>

<script>
	export default {
		name: "Carousel",
		data() {
			return {
				item: [{
						Img: require('@/assets/carousel/lunbo1.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo2.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo3.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo4.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo5.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo6.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo7.jpg')
					},
					{
						Img: require('@/assets/carousel/lunbo8.jpg')
					},
				]
			}

		}
	}
</script>

<style>
	.carousel {
		width: 1200px;
		height: 250px;
		margin: 0 auto;
		
	}
	.el-carousel{
		border-radius: 6px;
	}
	.el-carousel__container {
		height: 250px !important;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 250px;
		margin: 0;
		height: 250px;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.el-carousel__button {
		height: 8px !important;
		width: 8px !important;
		border-radius: 5px !important;
		margin: 0 5px !important;
	}
</style>
