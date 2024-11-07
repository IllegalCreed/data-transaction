<template>
  <div class="demand-order-detail-company-root-container">
    <span text-lg font-bold>商家信息</span>

    <el-skeleton :loading="getDemandOrderCurrentCompanyActionLoading" animated>
      <template #template>
        <el-skeleton-item variant="rect" class="!h-30"></el-skeleton-item>
      </template>
      <template #default>
        <div class="company-avatar-info-container">
          <img :src="company.avatar" class="avatar" />

          <div class="company-info-container">
            <div flex flex-row items-center>
              <span class="label">商家名称：</span>
              <span class="value">{{ company.name }}</span>
            </div>
            <div flex flex-row items-center>
              <span class="label">综合评分：</span>
              <el-rate
                :model-value="company.rating"
                size="small"
                disabled
                mb-2
              ></el-rate>
            </div>

            <div flex-1></div>

            <div flex flex-row flex-wrap items-center gap-2>
              <el-tag
                v-for="(tag, index) in company.tags"
                :key="index"
                type="info"
                >{{ tag }}</el-tag
              >
            </div>
          </div>
        </div>

        <el-button self-center class="btn default-btn"> 查看详情 </el-button>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { getDemandOrderCurrentCompany: getDemandOrderCurrentCompanyAction } =
  orderStore

const { orderId } = defineProps<{
  orderId: number | string
}>()

const {
  state: company,
  isLoading: getDemandOrderCurrentCompanyActionLoading,
  execute: executeGetDemandOrderCurrentCompanyAction,
} = useAsyncState(
  () => getDemandOrderCurrentCompanyAction(orderId),
  {
    id: 0,
    name: '',
    avatar: '',
    tags: [],
    rating: 5,
  },
  {
    immediate: false,
    throwError: true,
  },
)

onMounted(async () => {
  try {
    await executeGetDemandOrderCurrentCompanyAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.demand-order-detail-company-root-container {
  @apply flex flex-col gap-4;

  .company-avatar-info-container {
    @apply flex flex-row gap-4;
  }

  .avatar {
    @apply h-30 w-30 object-contain;
  }

  .company-info-container {
    @apply flex flex-col gap-2;

    .label {
      @apply text-sm text-[var(--color-text-lighter)];
    }

    .value {
      @apply text-sm text-[var(--color-text)];
    }
  }

  .btn {
    @apply mt-5;
  }

  @media (max-width: 40rem) {
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
