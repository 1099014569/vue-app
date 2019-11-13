<template>
    <div>
        <el-card class="box-card" border-radius="4px" :body-style="{padding:'0px'}">
            <div slot="header">
                <div  @click="jumpName(cardMes.nickname)"><el-avatar shape="square" size="small" :src="cardMes.headimg"></el-avatar></div>
                <div class="block"></div>
                <div class="name">
                    <span @click="jumpName(cardMes.nickname)">{{cardMes.nickname}}</span>
                </div>
                <el-button class="my-btn" type="success" :disabled="isClickBtn" plain @click="addFollow">
                        关注
                </el-button>               
            </div>
            <div class="text">
                <el-image v-if="cardMes.workimg" :src="cardMes.workimg" @click="viewBigImg"></el-image>
                <!-- 查看大图 -->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div class="desc">
                    <h1>{{cardMes.text_title}}</h1>
                    <p>{{cardMes.work_desc}}</p>
                </div>
            </div>
            <div class="bottom text">
                <el-button :class="Collection" type="text" @click="isClickCol"></el-button>
                <span>{{cardMes.like=="点赞" ? "点赞":cardMes.like+"人喜欢"}}</span>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: "NovelCard",
        props: {
            cardData: {
                type: Object
            }
        },
        data() {
            return {
                isClickBtn:false,
                Collection:"el-icon-star-off",
                // 弹出大图的设置
                dialogImageUrl:"",
                dialogVisible:false,

                cardMes:this.cardData
            }
        },
        methods: {
            // 添加关注操作
            addFollow() {
                this.isClickBtn=true;
                this.$message({
                    message:"关注成功",
                    type:"success"
                })
            },
            // 收藏操作
            isClickCol(){
				if(this.cardMes.like == "点赞"){
					this.cardMes.like = 1;
				}
				else if(this.Collection == "el-icon-star-off"){
					this.cardMes.like++;
				}
                this.Collection="el-icon-star-on";
            },
            // 查看大图
            viewBigImg(){
                this.dialogImageUrl=this.cardMes.workimg
                this.dialogVisible=true
            },
			// 跳转个人页面
			jumpName(nickname) {
				this.$router.push({
					path: "/user",
					query: {
						nickname
					}
				})
			}
        },
        beforeUpdate () {
            console.log("card",this.cardData)
        },
        mounted () {
            // console.log("挂载文字");
        },
    }
</script>
<style>
    .box-card{
        border-radius: 4px;
    }
    /* 卡片头部区 */
    .box-card .el-card__header {
        padding: 0;
        position: relative;
    }

    .name {
        width: 125px;
        display: inline-block;
        position: absolute;
        top: 0;
        color: #303133;
		cursor: pointer;
    }

    .el-card__header {
        height: 60px;
        line-height: 60px;
    }

    .el-avatar {
        margin-left: 16px;
        position: absolute;
        top: 16px;
		cursor: pointer;
    }
    .block{
        /* 解决absolute显示，占位 */
        display: inline-block;
        width: 60px;
        height: 60px;
    }

    .el-button.my-btn {
        position: absolute;
        right: 0;
        top: 16px;
        padding: 0;
        width: 54px;
        height: 28px;
        line-height: 28px;
        margin-right: 16px;
    }

    /* 卡片内容区 */
    .el-image {
        padding-top: 2px;
    }

    .text {
        font-size: 14px;
        color: #606266;
    }

    .desc{
        padding: 12px 15px 10px;
    }
    .desc h1{
        color: #252526;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.4;
        padding-bottom: 12px;
    }
    .desc p{
        text-indent: 20px;
    }

    .box-card {
        width: 300px;
        margin: 0 10px 20px;
    }

    /* 卡片底部 */
    .bottom {
        height: 55px;
        line-height: 55px;
        border-top: 1px solid #ededef;
        color:#909399 ;
    }
    .bottom .el-icon-star-off,
    .bottom .el-icon-star-on
    {
        margin: 0 10px 0 14px;
    }
</style>