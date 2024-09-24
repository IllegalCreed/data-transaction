<template>
  <div class="demand-order-company-item-root-container">
    <img :src="company.avatar" class="avatar" />
    <div flex flex-col flex-1 min-w-0>
      <span text-lg font-bold>{{ company.name }}</span>
      <el-rate :model-value="company.rating" size="small" disabled mb-2></el-rate>
      <div flex flex-row flex-wrap items-center gap-2>
        <el-tag v-for="(tag, index) in company.tags" :key="index" type="info" size="small">{{
          tag
        }}</el-tag>
      </div>
    </div>

    <div class="btn-container">
      <el-button class="btn" size="small">联系商家</el-button>
      <el-button class="btn" type="primary" size="small">选择商家</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICompany } from '@/types/company'

const { company } = defineProps<{ company: ICompany }>()
</script>

<style scoped lang="scss">
.demand-order-company-item-root-container {
  @apply flex flex-row items-center border-solid border border-gray-100 rounded p-4 gap-4;

  .avatar {
    @apply h-20 w-20 object-contain;
  }

  .btn-container {
    @apply flex flex-col gap-4;

    .btn {
      @apply ml-0;
    }
  }

  @media (max-width: 40rem) {
    .avatar {
      @apply hidden;
    }
  }

  @media (max-width: 30rem) {
    @apply flex-col items-start;

    .btn-container {
      @apply self-stretch flex-row gap-2;
      .btn {
        @apply flex-1;
      }
    }
  }
}
</style>
