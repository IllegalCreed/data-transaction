<template>
  <div class="demand-info-root-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div flex flex-col gap-4>
          <el-skeleton-item variant="h1" class="!w-50"></el-skeleton-item>
          <div flex flex-row gap-4>
            <el-skeleton-item v-for="n in 3" :key="n" variant="p" class="!w-10"></el-skeleton-item>
          </div>
          <el-divider type="dashed" />
          <el-skeleton-item v-for="n in 5" :key="n" variant="p"></el-skeleton-item>
          <el-divider type="dashed" />
          <el-skeleton-item variant="h1" class="!w-30"></el-skeleton-item>
          <div class="demand-info-props-container">
            <el-skeleton-item v-for="n in 7" :key="n" variant="h1" class="!w-40"></el-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <span class="title">{{ baseInfo.title }}</span>
        <div class="tags-container">
          <el-tag v-for="(tag, index) in baseInfo.tags" :key="index" type="primary" size="small">
            {{ tag }}
          </el-tag>
        </div>
        <el-divider type="dashed" />
        <span class="desc">{{ baseInfo.description }}</span>
        <el-divider type="dashed" />
        <el-descriptions title="需求细节" :column="descriptionColumn" :size="descriptionSize">
          <el-descriptions-item label="状态">
            <el-tag :type="statusTagType" size="small">
              {{ mappedStatus }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="交易模式">{{ mappedTransactionMode }}</el-descriptions-item>
          <el-descriptions-item
            v-if="baseInfo.transactionType.mode === TransactionMode.Tender"
            label="付款方式"
            >{{ mappedPayType }}</el-descriptions-item
          >
          <el-descriptions-item label="预算金额">{{ baseInfo.budget }} 元</el-descriptions-item>
          <el-descriptions-item label="发布者">{{ baseInfo.publisher }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ baseInfo.createTime }}</el-descriptions-item>
          <el-descriptions-item label="预期完成时间">{{
            baseInfo.expectedDeliveryDate
          }}</el-descriptions-item>
        </el-descriptions>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { TransactionMode, type IDemandBaseInfo } from '@/types/demand'
import {
  DEMAND_ORDER_STATUS_MAP,
  DEMAND_ORDER_STATUS_TAG_TYPE,
  DEMAND_TRANSACTION_MODE_MAP,
  DEMAND_PAY_TYPE_MAP
} from '@/constants/demandOrder'
const mappedStatus = computed(() => DEMAND_ORDER_STATUS_MAP[baseInfo.status] || '待审核')
const statusTagType = computed(() => DEMAND_ORDER_STATUS_TAG_TYPE[baseInfo.status] || 'info')
const mappedTransactionMode = computed(
  () => DEMAND_TRANSACTION_MODE_MAP[baseInfo.transactionType.mode] || '招标'
)
const mappedPayType = computed(() => {
  if (baseInfo.transactionType.mode === TransactionMode.Tender)
    return DEMAND_PAY_TYPE_MAP[baseInfo.transactionType.payType] || '按项目'
})

const { baseInfo } = defineProps<{
  demandId: string
  baseInfo: IDemandBaseInfo
  loading: boolean
}>()

onMounted(() => {})

const descriptionSize = ref<'large' | 'default' | 'small'>('default')
const descriptionColumn = ref(3)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    descriptionSize.value = 'small'
    descriptionColumn.value = 1
  } else {
    descriptionSize.value = 'default'
    descriptionColumn.value = 3
  }
})
</script>

<style lang="scss" scoped>
.demand-info-root-container {
  @apply flex flex-col bg-[var(--color-background-alternating)] p-10 rounded shadow;

  .title {
    @apply text-2xl font-bold;
  }

  .tags-container {
    @apply flex flex-row flex-wrap gap-2 mt-4;
  }

  .desc {
    @apply text-[var(--color-text-light)] text-sm leading-loose indent-lg;
  }

  @media (max-width: 40rem) {
    @apply p-5;
  }
}

.demand-info-props-container {
  @apply grid grid-cols-3 gap-4;

  @media (max-width: 40rem) {
    @apply grid-cols-1;
  }
}
</style>
