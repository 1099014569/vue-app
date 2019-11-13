<template>
    <!-- 发布图片作品页面(完整结构) -->
    <div id="publish">
        <other-nav></other-nav>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import OtherNav from "@/components/nav/OtherNav.vue"
    export default {
        name: 'Publish',
        components: {
            "other-nav": OtherNav
        }
    }
</script>

<style>
    #publish {
        background: #ededef;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    
    #publish .in {
        width: 100%;
    }

    #publish .nav-logo {
        margin-left: 10px;
    }
    #publish .el-button{
        width: 113px;
        height: 50px;
        border-radius: 0;
    }
    .main{
        margin-top: 50px;
        overflow: hidden;
    }
</style>