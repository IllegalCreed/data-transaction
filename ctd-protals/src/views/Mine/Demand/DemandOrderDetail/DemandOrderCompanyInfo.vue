<template>
  <div class="demand-order-detail-company-root-container">
    <span text-xl font-bold>商家信息</span>

    <div class="company-avatar-info-container">
      <img :src="company.avatar" class="avatar" />

      <div class="company-info-container">
        <div><strong>商家名称：</strong> {{ company.name }}</div>
        <div>
          <strong>综合评分：</strong>
          <el-rate :model-value="company.rating" size="small" disabled mb-2></el-rate>
        </div>

        <div flex-1></div>

        <div flex flex-row flex-wrap items-center gap-2>
          <el-tag v-for="(tag, index) in company.tags" :key="index" type="info" size="small">{{
            tag
          }}</el-tag>
        </div>
      </div>
    </div>

    <el-button self-center class="btn"> 查看详情 </el-button>
  </div>
</template>

<script setup lang="ts">
import type { ICompany } from '@/types/company'

defineProps<{
  orderId: number
}>()

const company = ref<ICompany>({
  id: '1',
  name: '数据科技有限公司',
  avatar: 'https://via.placeholder.com/100',
  tags: ['数据分析', '机器学习'],
  rating: 4.5
})
</script>

<style scoped lang="scss">
.demand-order-detail-company-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md gap-4;

  .company-avatar-info-container {
    @apply flex flex-row gap-4;
  }

  .avatar {
    @apply h-30 w-30 object-contain;
  }

  .company-info-container {
    @apply flex flex-col gap-2;
  }

  .btn {
    @apply mt-4;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;

    .company-avatar-info-container {
      @apply flex flex-col gap-4;
    }

    .company-info-container {
      @apply grid-cols-1 gap-2;
    }

    .btn {
      @apply self-start;
    }
  }
}
</style>
