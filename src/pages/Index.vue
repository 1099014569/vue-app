<template>
	<!-- 首页(完整结构) -->
	<div>
		<!-- 导航栏(可切换) -->
		<transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
			<my-nav v-if="isShiftNav"></my-nav>
			<my-other-nav v-else></my-other-nav>
		</transition>
		<div class="main">
			<!-- 轮播图 -->
			<my-carousel></my-carousel>
			<!-- 次级导航栏 -->
			<div class="navbar">
				<ul class="navbar-item-list">
					<li v-for="(item,index) in navbarData" :key="index">
						<p :class="[index==nowPage?'now-page-color':'other=page-color']" @click="navGoTo(item.url)">
							{{item.title}}</p>
					</li>
				</ul>
			</div>

			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Nav from "@/components/nav/Nav.vue"
	import OtherNav from "@/components/nav/OtherNav"
	import Carousel from "@/components/index/Carousel"

	import "@/assets/animate.css"


	export default {
		name: 'Index',
		components: {
			"my-nav": Nav,
			"my-other-nav": OtherNav,
			"my-carousel": Carousel
		},
		data() {
			return {
				isShiftNav: true,
				nowPage: "",
				navbarData: [{
						title: "绘画",
						url: "/illust"
					},
					{
						title: "关注",
						url: "/hometag"
					},
					{
						title: "话题"
					},
					{
						title: "写作",
						url: "/novel"
					}
				]
			}
		},

		methods: {
			/* 
			  实现页面滚动到一定距离，切换导航栏组件
			 */
			shiftNav() {
				// 改变this指向
				let that = this
				window.onscroll = function() {
					window.scrollY > 800 ? that.isShiftNav = false : that.isShiftNav = true
				}
			},
			/* 
			    跳转

			*/
			navGoTo(url) {

				this.$router.push(url)

				this.$router.go(0)
			}

		},
		mounted() {
			this.shiftNav();

			for (let index = 0; index < this.navbarData.length; index++) {
				if (this.navbarData[index].url == this.$route.path) {
					this.nowPage = index
				}
			}	
			
		}
	}
</script>

<style>
	.main {
		margin-top: 50px;
		background: #ededef;
	}

	/* 次级导航栏 */
	.navbar-item-list {

		width: 1200px;
		display: flex;
		justify-content: center;
		height: 48px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .05);
		line-height: 48px;
		background: #fff;
		margin: 0 auto;
		margin-top: 12px;
	}

	.navbar-item-list li {
		padding-right: 48px;
	}
	.navbar-item-list p:hover{
		cursor: pointer;
		color: #fa4b8b;;
	}
	.navbar-item-list li:last-child {
		padding: 0;
	}

	/* 轮播 */
	.carousel {
		margin-top: 12px;
	}

	.now-page-color {
		color: #fa4b8b;
		font-weight: 600;
	}

	.other-page-color {
		color: #252526;
	}
</style>
