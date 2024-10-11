<template>
  <div class="demand-item-root-container" @click="goToDemandDetail">
    <div class="text-container">
      <span class="title">{{ demand.title }}</span>
      <div class="tag-container">
        <el-tag v-for="(tag, index) in demand.tags" :key="index" type="primary" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span class="desc">{{ demand.description }}</span>
      <div flex-1></div>
      <div flex flex-row justify-between items-center mt-4>
        <span class="time">{{ demand.createTime }}</span>
        <span class="price">￥{{ demand.budget }}</span>
      </div>
    </div>
    <div class="bottom-container">
      <el-tag :type="statusTagType">{{ mappedStatus }}</el-tag>
      <span class="mode">{{ demand.transactionMode.type }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { IDemand } from '@/types/demand'
import { useRouter } from 'vue-router'

const { demand } = defineProps<{
  demand: IDemand
}>()

import { DEMAND_ORDER_STATUS_MAP, DEMAND_ORDER_STATUS_TAG_TYPE } from '@/constants/demandOrder'
const mappedStatus = computed(() => DEMAND_ORDER_STATUS_MAP[demand.status] || '待审核')
const statusTagType = computed(() => DEMAND_ORDER_STATUS_TAG_TYPE[demand.status] || 'info')

const router = useRouter()

const goToDemandDetail = () => {
  router.push(`/demand/${demand.id}`)
}
</script>

<style scoped lang="scss">
.demand-item-root-container {
  @apply m-2 w-96 cursor-pointer relative shadow flex flex-col p-0 bg-[var(--color-background-alternating)];

  .text-container {
    @apply flex flex-col flex-1 p-8;

    .title {
      @apply font-bold text-lg mr-10 line-clamp-1;
    }

    .tag-container {
      @apply flex flex-row flex-wrap gap-2 mt-2;
    }

    .desc {
      @apply mt-6 text-sm text-[var(--color-text-light)] line-clamp-2 leading-loose;
    }

    .time {
      @apply text-sm text-[var(--color-text-lighter)];
    }

    .price {
      @apply font-bold text-lg text-[var(--color-price)];
    }
  }

  .bottom-container {
    @apply flex justify-between items-center px-8 py-2 border-t-1 border-t-solid border-t-[var(--color-border)];

    .mode {
      @apply font-bold text-base text-[var(--color-primary)];
    }
  }

  @media (max-width: 40rem) {
    @apply w-[calc(50%-10px)] m-1;

    .text-container {
      @apply p-6;
    }

    .bottom-container {
      @apply px-6;
    }
  }

  @media (max-width: 30rem) {
    @apply w-full;

    .text-container {
      @apply p-4;
    }

    .bottom-container {
      @apply px-4;
    }
  }
}

:deep(.demand-item-body-container) {
  @apply;
}
</style>
