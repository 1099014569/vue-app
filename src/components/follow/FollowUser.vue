<template>
    <div class="follow-user" @mouseenter="showRemBtn" @mouseleave="hiddenRemBtn">
        <div class="user-info">
            <div @click="jumpName(followData.follow_nickname)"><el-avatar size="medium" :src="followData.headimg"></el-avatar></div>
            <div class="desc">
                <h5 @click="jumpName(followData.follow_nickname)">{{followData.follow_nickname}}</h5>
                <p>{{followData.user_tag}}</p>
            </div>
        </div>
        <el-button size="mini" :style="isShow" :type="btnType" @click="clickBtn" :class="addFollowIcon">
            {{btnMes}}
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'FollowUser',
        props: {
            // 关注用户的数据
            followData: {
                type: Object
            }
        },
        data() {
            return {
                // 关注按钮数据
                btnMes: "已关注",
                btnType: "info",
                addFollowIcon: "",
                isShow: { display: "none" },
                // 用户数据
                avatarUrl: "https://p9-bcy.byteimg.com/img/banciyuan/Public/Upload/avatar/1304798/997e4a0aa29244d485d257549a2e992a/fat.jpg~tplv-banciyuan-abig.image"
            }
        },
        methods: {
            // 显示"取消关注"按钮
            showRemBtn() {
                this.isShow.display = "block";
            },
            // 隐藏"取消关注"按钮
            hiddenRemBtn() {
                this.isShow.display = "none";
            },
            removeOrAdd(option) {
                // axios传输数据需要转换
                let postData = this.$qs.stringify({
                    id: this.followData.id,
                    nickname: this.followData.nickname,
                    user_tag: this.followData.user_tag,
                    headimg: this.followData.headimg,
                    option:option
                })
                this.axios.post('http://localhost:8888/following', postData)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            clickBtn() {

                if (this.btnMes == "") {
                    // 添加关注
                    this.addFollowIcon = "";
                    this.btnMes = "已关注";
                    this.btnType = "info";
                    this.$message({
                        message: "添加关注成功",
                        duration: 1000,
                        type: "success",
                        center: true
                    });
                    this.removeOrAdd(1);
                    return
                }
                // 取消关注
                this.addFollowIcon = "el-icon-plus";
                this.btnMes = "";
                this.btnType = "success";
                this.$message({
                    message: "取消关注成功",
                    duration: 1000,
                    center: true
                });
                this.removeOrAdd(0);

            },
			// 跳转到个人
			jumpName(nickname) {
				this.$router.push({
					path: "/user",
					query: {
						nickname
					}
				})
			}
        }
    }
</script>

<style scoped>
    .follow-user {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 430px;
        height: 80px;
        border-bottom: 1px solid #e9e9f0;
        box-sizing: border-box;
    }

    .desc {
        display: inline-block;
        padding-left: 15px;
    }

    .desc h5 {
        color: #303133;
        font-weight: 400;
        font-size: 16px;
		cursor: pointer;
    }

    .desc p {
        font-size: 14px;
        color: #a1a1a6;
    }

    .user-info {
        display: flex;
        align-items: flex-start;
    }

    .user-info .el-avatar {
        position: static;
        width: 55px;
        height: 55px;
    }

    .el-button {
        height: 30px;
    }
</style>