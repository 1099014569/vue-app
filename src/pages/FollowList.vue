<template>
    <div id="follow-list">
        <my-nav></my-nav>
        <!-- 关注列表 -->
        <div class="main">
            <div class="list-content">
                <ul class="list-content-ul">
                    <li v-for="(item,index) in followData" :key="item.id">
                        
                        <my-user :follow-data="followData[index]"></my-user>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import FollowUser from "@/components/follow/FollowUser";
    import Nav from "@/components/nav/Nav";
    export default {
        name: 'FollowList',
        data() {
            return {
                isShowNum: { display: "none" },
                isHoverPage: "el-icon-caret-bottom",
                followData: []
            }
        },
        components: {
            "my-user": FollowUser,
            "my-nav": Nav
        },
        methods: {
            
            hover() {
                this.isHoverPage = "el-icon-caret-top"
                this.isShowNum.display = "block"
            },
            leave() {
                this.isHoverPage = "el-icon-caret-bottom"
                this.isShowNum.display = "none"
            }
        },
        mounted() {
            /* 
                请求后端获得关注人列表数据
            */
		   // let nickname = this.$route.query.nickname;
		   // if(this.$route.query.nickname == undefined){
				let nickname=JSON.parse(localStorage.getItem("accountMes")).nickname
		   // }
		   let postData=this.$qs.stringify({
			   nickname
		   })
            this.axios.post("http://localhost:8888/following",postData)
                .then(res => {
                    this.followData = res.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    }
</script>

<style scoped>
    #follow-list{
        background: #f5f5fa;
    }
    .main {
        width: 960px;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 50px;
		background-color: #f5f5fa;
		padding-top: 0;
    }
    
    .list-content {
        width: 960px;
        box-sizing: border-box;
        padding:  0 16px;
		background-color: #fff;
		margin-top: 12px;
    }

    .list-content-ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .user-item {
        background-color: #ececec;
    }
    .el-row {
        margin-bottom: 40px;
    }

    .el-col {
        text-align: center;
        line-height: 32px;
    }

    .pagenum-list {
        width: 50px;
        position: absolute;
        bottom: 33px;
        left: 27px;
        background: #fff;
        border: 1px solid #ccc;
    }

    .pagenum-list li {
        height: 26px;
        line-height: 26px;
        text-align: center;
    }

    .pagenum-list li:hover {
        background: #ccc;
    }
</style>