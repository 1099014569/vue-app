<template>
    <!-- 发布框组件 -->
    <div class="release">
        <ul class="item-list">
            <li v-for="item in liData" @click="goTo(item)">
                <img width="46" :src="item.imgUrl">
                <div class="release-desc">
                    <h6>{{item.title}}</h6>
                    <p>{{item.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import relImg from "@/assets/rel-img.png";
    import relText from "@/assets/rel-text.png";

    export default {
        name: 'Release',
        // inject:["reload"],
        data() {
            return {
                // 每个li选项卡的页面数据
                liData: [
                    { title: "图片", desc: "绘画、摄影、COS、手办展示...", imgUrl: relImg, pageUrl: "/publish/imageform" },
                    { title: "文字", desc: "文章、点评、随笔、记录...", imgUrl: relText, pageUrl: "/publish/textform" }
                ]
            }
        },
        methods: {
            /* 
                点击按钮调转到对应的发布页面
                如当前路由与想访问的路由不同，则跳转。否则刷新页面
            */
            goTo(item) {
                // this.$route.path获取当前路由
                if (this.$route.path != item.pageUrl) {
                    this.$router.push(item.pageUrl)

                }else{
                    this.$router.go(0)
                    
                }
            }
        },
    }
</script>

<style scoped>
    .release {
        width: 300px;
        background: #fff;
    }

    .item-list {
        width: 280px;
        margin: 0 auto;
    }

    .item-list li {
        height: 68px;
        background: #f5f6f7;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        border-radius: 6px;
		cursor: pointer;
    }

    .item-list li:last-child {
        margin-top: 10px;
    }

    .item-list li:hover {
        background: #e9e9f0;
    }

    .release-desc {
        padding-left: 10px;
    }

    .release-desc h6 {
        font-size: 16px;
        color: #303133;
        font-weight: 500;
    }

    .release-desc p {
        font-size: 12px;
        color: #909399;
    }
</style>