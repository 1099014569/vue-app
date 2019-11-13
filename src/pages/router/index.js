import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from "@/pages/Index";
import Publish from "@/pages/Publish";
import FollowList from "@/pages/FollowList";
import AccountSettings from "@/pages/AccountSettings"
import HomePageContent from "@/pages/HomePageContent"

import Browse from "@/views/Browse";

import ImageForm from "@/components/publish/ImageForm";
import TextForm from "@/components/publish/TextForm";
import IllustCard from "@/components/browse/IllustCard";
import NovelCard from "@/components/browse/NovelCard";
import LoginHome from "@/pages/LoginHome"
import Register from "@/pages/Register"
import HomeContent from "@/pages/HomeContent";
import HomeTag from "@/pages/HomeContentTag";

Vue.use(VueRouter)

/* 解决 Uncaught (in promise) */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


export default new VueRouter({
	routes: [{
			path: '/',
			name: "Index",
			component: Index,
			redirect: "/browse",

			children: [{
					path: '/browse',
					name: "Browse",
					component: Browse,
					redirect: "browse",

					children: [{
							path: '/illust',
							name: "Illust",
							component: IllustCard,
							meta: {
								title: "绘画"
							}
						},
						{
							path: '/novel',
							name: "Novel",
							component: NovelCard,
							meta: {
								title: "小说"
							}
						},
					],
					redirect: "/illust"
				},
				{
					path: "/homecontent",
					name: "HomeContent",
					component: HomeContent,
					redirect: "/hometag",
					children: [{
						path: '/hometag',
						name: "HomeTag",
						component: HomeTag,
						meta: {
							isLogin: true,
							title: "关注"
						}
					}]
				}
			],
		},
		{
			path: '/publish',
			name: "Publish",
			component: Publish,
			children: [{
				path: "/publish/imageform",
				name: "ImageForm",
				component: ImageForm,
				meta: {
					isLogin: true, //设置登录权限
					title: "发布图片" //浏览器网页标题
				}
			}, {
				path: '/publish/textform',
				name: "TextForm",
				component: TextForm,
				meta: {
					isLogin: true,
					title: "发布文章"
				}
			}]
		},
		{
			path: "/follow",
			name: "FollowList",
			component: FollowList,
			meta: {
				isLogin: true, //设置登录权限
				title: "关注列表" //浏览器网页标题
			}
		},
		{
			path: '/setting',
			name: "AccountSettings",
			component: AccountSettings,
			meta: {
				isLogin: true, //设置登录权限
				title: "个人设置" //浏览器网页标题
			}
		},
		//个人主页
		{
			path: "/user",
			name: "Home",
			component: HomePageContent,
			meta: {
				isLogin: true,
				title: "个人主页"
			}
		},
		// 登陆
		{
			path: "/loginhome",
			name: "LoginHome",
			component: LoginHome,
			meta: {
				title: "登录" //浏览器网页标题
			}
		},
		// 注册
		{
			path: "/register",
			name: "Register",
			component: Register
		},
	]
});
