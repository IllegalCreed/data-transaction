<template>
    <div class="home-root-view">
        <el-carousel height="300px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>

        <div self-center flex flex-row space-x-10 mt-10>
            <el-card shadow="always" w-80 h-100 text-8>数据交易</el-card>
            <el-card shadow="always" w-80 h-100 text-8>数据服务</el-card>
            <el-card shadow="always" w-80 h-100 text-8>资产咨询</el-card>
        </div>

        <el-card shadow="always" self-center w-260 h-80 text-8 mt-10>热点需求</el-card>

        <div flex justify-center items-center min-w-full bg-blueGray min-h-100 text-8 mt-10>
            商业模式闭环图
        </div>

        <div self-center flex flex-row space-x-10 mt-10>
            <el-card shadow="always" w-125 h-50 text-8>顶级合作伙伴</el-card>
            <el-card shadow="always" w-125 h-50 text-8>顶级合作伙伴</el-card>
        </div>

        <el-card shadow="always" flex justify-center items-center self-center w-260 h-80 text-8 mt-10>合作伙伴列表</el-card>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home-root-view {
    @apply flex flex-col;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    @apply bg-blueGray
}

.el-carousel__item:nth-child(2n + 1) {
    @apply bg-slate-300;
}
</style>