<template>
  <div class="demand-order-detail-baseinfo-root-container">
    <div class="header-container">
      <div flex-1 flex flex-col gap-2>
        <span text-2xl font-bold>{{ orderDetails.title }}</span>

        <div flex flex-row gap-2>
          <el-tag :type="ActiveStatusTagType" disable-transitions>
            {{ mappedActiveStatus }}
          </el-tag>
          <el-tag :type="statusTagType" disable-transitions>
            {{ mappedStatus }}
          </el-tag>
        </div>

        <span text-sm text-gray-500>{{ orderDetails.shotDesc }}</span>

        <div flex-1></div>

        <div flex flex-col gap-1>
          <div flex flex-row items-center text-slate-500 text-sm>
            <strong>创建时间：</strong>
            <span>{{ orderDetails.createTime }}</span>
          </div>
          <div v-if="showExpectedDeliveryTime" flex flex-row items-center text-slate-500 text-sm>
            <strong>预计交付时间：</strong>
            <span>{{ orderDetails.expectedDeliveryDate }}</span>
          </div>
          <div v-if="showActualDeliveryTime" flex flex-row items-center text-slate-500 text-sm>
            <strong>实际交付时间：</strong>
            <span>{{ orderDetails.actualDeliveryDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="base-info-container">
      <div><strong>交易类型：</strong> {{ orderDetails.transactionMode.type }}</div>
      <div>
        <strong>付款方式：</strong>
        {{
          orderDetails.transactionMode.type === '招标'
            ? orderDetails.transactionMode.tenderType
            : ''
        }}
      </div>
      <div><strong>预算：</strong> {{ orderDetails.budget }}</div>
    </div>

    <div class="btn-container">
      <el-button class="btn" type="primary" v-if="status < 2">编辑</el-button>
      <el-button class="btn" type="primary" v-if="status < 2">{{
        orderDetails.activeStatus === DemandActiveStatus.Enabled ? '停用' : '启用'
      }}</el-button>
      <el-button class="btn" type="primary" v-if="status < 3">删除</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DemandActiveStatus,
  type DemandOrderStatus,
  type IOrderDemandDetails
} from '@/types/demand'

const { orderId, status } = defineProps<{
  orderId: number
  status: DemandOrderStatus
}>()

const orderDetails = ref<IOrderDemandDetails>({
  id: orderId,
  title: '高级数据分析平台',
  shotDesc: '一个功能全面的数据分析平台，适用于大规模数据处理。',
  status: status,
  transactionMode: { type: '招标', tenderType: '按项目' },
  activeStatus: DemandActiveStatus.Enabled,
  budget: 999.99,
  createTime: '2024-03-15 09:00:00',
  expectedDeliveryDate: '2024-03-25 17:00:00',
  actualDeliveryDate: '2024-03-24 16:30:00'
})

watchEffect(() => {
  orderDetails.value.status = status
})

const showExpectedDeliveryTime = computed(() => orderDetails.value.status === 2) // 待交付
const showActualDeliveryTime = computed(
  () => [3, 4, 5].includes(orderDetails.value.status) // 待验查、待评价、已评价
)

import {
  DEMAND_ORDER_STATUS_MAP,
  DEMAND_ORDER_STATUS_TAG_TYPE,
  DEMAND_ACTIVE_STATUS_MAP,
  DEMAND_ACTIVE_STATUS_TAG_TYPE
} from '@/constants/demandOrder'

const mappedStatus = computed(() => DEMAND_ORDER_STATUS_MAP[orderDetails.value.status] || '待审核')
const statusTagType = computed(
  () => DEMAND_ORDER_STATUS_TAG_TYPE[orderDetails.value.status] || 'info'
)
const mappedActiveStatus = computed(
  () => DEMAND_ACTIVE_STATUS_MAP[orderDetails.value.activeStatus] || '数据集'
)
const ActiveStatusTagType = computed(
  () => DEMAND_ACTIVE_STATUS_TAG_TYPE[orderDetails.value.activeStatus] || 'success'
)
</script>

<style scoped lang="scss">
.demand-order-detail-baseinfo-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md gap-4;

  .header-container {
    @apply flex flex-row gap-4;
  }

  .base-info-container {
    @apply grid grid-cols-2 gap-4;
  }

  .btn-container {
    @apply flex flex-row gap-4;

    .btn {
      @apply ml-0;
    }
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;

    .header-container {
      @apply flex-col;
    }

    .base-info-container {
      @apply grid-cols-1;
    }

    .btn-container {
      @apply flex-col;
    }
  }
}
</style>
