<template>
    <div class="browse">
        <el-row style="margin: 0 auto;">
            <el-col :span="8">
                <router-view v-for="(item,index) in browseData.col0" :card-data="browseData.col0[index]"></router-view>
            </el-col>
            <el-col :span="8">
                <router-view v-for="(item,index) in browseData.col1" :card-data="browseData.col1[index]"></router-view>
            </el-col>
            <el-col :span="8">
                <router-view v-for="(item,index) in browseData.col2" :card-data="browseData.col2[index]"></router-view>
            </el-col>
			<!-- v-infinite-scroll="load" style="overflow:auto" -->
        </el-row>
    </div>
</template>

<script>

    export default {
        name: 'Browse',

        data() {
            return {
                browseData: { col0: [], col1: [], col2: [] },
				// arr: [],
				// count: 0
            }
        },
        methods: {
            /* 
                将后端的数据处理，分为三部分方便展示
            */
            handleData(data) {

                for (let i = 0; i < data.length; i++) {
                    let index = `col${i % 3}`
                    this.browseData[index].push(data[i])
                }
				// this.arr.push(this.browseData.col2[this.count]);
            },
            /* 

                请求后台服务器页面数据
    
            */
            getData() {

                let url = `http://localhost:8888${this.$route.path}`

                this.axios.get(url)
                    .then(res => {
                        this.handleData(res.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
			
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    .browse {
        background: #ededef;
        padding-top: 15px;
    }

    div.el-row {
        width: 960px;
    }
</style>