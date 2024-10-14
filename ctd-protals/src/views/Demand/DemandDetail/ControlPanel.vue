<template>
  <div class="control-panel-root-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div flex flex-col gap-4 mt-2>
          <el-skeleton-item variant="p" class="!w-50"></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-30" mt-10></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-20"></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-30"></el-skeleton-item>
          <el-skeleton-item variant="p" class="!w-20"></el-skeleton-item>

          <el-skeleton-item variant="p" class="!w-30" mt-6></el-skeleton-item>
          <el-skeleton-item variant="h1" class="!w-40"></el-skeleton-item>

          <div flex flex-row gap-4 mt-6>
            <el-skeleton-item variant="rect" class="!h-10" flex-1></el-skeleton-item>
            <el-skeleton-item variant="rect" class="!h-10" flex-1></el-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <span class="title">{{ baseInfo.title }}</span>

        <label class="label" mt-10>交易模式</label>
        <span class="value">{{ mappedTransactionMode }}</span>
        <label class="label" v-if="baseInfo.transactionType.mode === TransactionMode.Tender"
          >付款方式</label
        >
        <span class="value">{{ mappedPayType }}</span>

        <label class="label" mt-6>预算</label>
        <span class="price">￥{{ baseInfo.budget }}</span>

        <div class="actions-container">
          <el-button flex-1 type="default" size="large" @click="addToFav">收藏需求</el-button>
          <el-button flex-1 type="primary" size="large" @click="placeOrder">承接需求</el-button>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { TransactionMode, type IDemandBaseInfo } from '@/types/demand'
import { DEMAND_TRANSACTION_MODE_MAP, DEMAND_PAY_TYPE_MAP } from '@/constants/demandOrder'

const mappedTransactionMode = computed(
  () => DEMAND_TRANSACTION_MODE_MAP[baseInfo.transactionType.mode] || '招标'
)
const mappedPayType = computed(() => {
  if (baseInfo.transactionType.mode === TransactionMode.Tender)
    return DEMAND_PAY_TYPE_MAP[baseInfo.transactionType.payType] || '按项目'
})

const { baseInfo } = defineProps<{
  productId: string
  baseInfo: IDemandBaseInfo
  loading: boolean
}>()

const placeOrder = () => {}

const addToFav = () => {}
</script>

<style scoped lang="scss">
.control-panel-root-container {
  @apply sticky top-30 w-100 flex flex-col gap-2 p-8 rounded shadow bg-[var(--color-background-alternating)];

  .title {
    @apply text-2xl font-bold;
  }

  .label {
    @apply text-lg;
  }

  .value {
    @apply text-base text-[var(--color-primary)];
  }

  .price {
    @apply font-bold text-[var(--color-price)] text-3xl select-none;
  }

  .actions-container {
    @apply flex flex-row justify-stretch gap-4 mt-4;
  }
}
</style>
