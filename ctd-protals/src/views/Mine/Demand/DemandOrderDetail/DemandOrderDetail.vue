<template>
  <div class="demand-order-detail-root-container">
    <div flex flex-row justify-between v-if="!isMobileDevice">
      <div class="back-btn" @click="back">
        <i-ion:arrow-back-circle-outline h-6 w-6 /><span>返回</span>
      </div>
      <el-button size="small" type="primary" @click="changeCurrentStep"
        >测试按钮，切换订单状态</el-button
      >
    </div>

    <el-divider v-if="!isMobileDevice" />

    <div flex flex-row items-stretch>
      <demand-order-base-info
        :orderDetails="orderDetails"
        :loading="getDemandOrderDetailActionLoading"
        flex-1
      />
      <el-skeleton
        :loading="getDemandOrderDetailActionLoading"
        animated
        class="!w-auto"
      >
        <template #template>
          <el-skeleton-item
            variant="rect"
            class="!h-80 !w-40 ml-10"
          ></el-skeleton-item>
        </template>
        <template #default>
          <el-steps
            direction="vertical"
            :active="
              currentStep === steps.length - 1 ? currentStep + 1 : currentStep
            "
            finish-status="success"
            process-status="process"
            class="step"
          >
            <el-step
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
            />
          </el-steps>
        </template>
      </el-skeleton>
    </div>

    <el-divider />

    <demand-order-company-selector
      v-if="currentStep === getStatusIndex(DemandOrderStatus.Bidding)"
      :orderId="orderId"
    />

    <el-divider
      v-if="currentStep === getStatusIndex(DemandOrderStatus.Bidding)"
    />

    <demand-order-company-info
      v-if="currentStep > getStatusIndex(DemandOrderStatus.Bidding)"
      :orderId="orderId"
    />
    <el-divider
      v-if="currentStep > getStatusIndex(DemandOrderStatus.Bidding)"
    />

    <demand-order-contract-info
      v-if="currentStep > getStatusIndex(DemandOrderStatus.Contract)"
      :orderId="orderId"
    />
    <el-divider
      v-if="currentStep > getStatusIndex(DemandOrderStatus.Contract)"
    />

    <demand-order-review-info
      v-if="currentStatus === DemandOrderStatus.Completed"
      :orderId="orderId"
    />

    <div class="btn-container">
      <el-button
        class="btn"
        v-if="currentStatus === DemandOrderStatus.Contract"
        type="primary"
        >签署合同</el-button
      >
      <el-button
        class="btn"
        v-if="currentStatus === DemandOrderStatus.ToCheck"
        type="primary"
        >确认交付</el-button
      >
      <el-button
        class="btn"
        v-if="currentStatus === DemandOrderStatus.ToReview"
        type="primary"
        >评价订单</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import DemandOrderBaseInfo from './DemandOrderBaseInfo.vue'
import DemandOrderCompanySelector from './DemandOrderCompanySelector/DemandOrderCompanySelector.vue'
import DemandOrderCompanyInfo from './DemandOrderCompanyInfo.vue'
import DemandOrderContractInfo from './DemandOrderContractInfo.vue'
import DemandOrderReviewInfo from './DemandOrderReviewInfo.vue'
import { DEMAND_ORDER_STATUS_MAP, DemandOrderStatus } from '@/types/demandOrder'
import { PayType, TransactionMode } from '@/types/demand'
import { ActiveStatus } from '@/types/common'

import { useOrderStore } from '@/stores/modules/order'

const orderStore = useOrderStore()
const { getDemandOrderDetail: getDemandOrderDetailAction } = orderStore

const orderId = useRouteParams<string>('id', '')
watch(
  () => orderId,
  () => {
    executeGetDemandOrderDetailAction()
  },
)
const {
  state: orderDetails,
  isLoading: getDemandOrderDetailActionLoading,
  execute: executeGetDemandOrderDetailAction,
} = useAsyncState(
  () => getDemandOrderDetailAction(orderId.value),
  {
    id: 0,
    title: '',
    tags: [],
    description: '',
    transactionType: {
      mode: TransactionMode.Tender,
      payType: PayType.ByFixedPrice,
    },
    budget: 0,
    createTime: '',
    expectedDeliveryDate: '',
    status: DemandOrderStatus.Pending,
    activeStatus: ActiveStatus.Enabled,
  },
  { shallow: false },
)

const stepList = Object.values(DemandOrderStatus)
const steps = stepList.map(status => ({
  title: DEMAND_ORDER_STATUS_MAP[status],
}))

const currentStep = ref(0)
const currentStatus = computed(() => stepList[currentStep.value])
watch(
  () => currentStatus.value,
  newValue => {
    orderDetails.value.status = newValue
  },
)

const changeCurrentStep = () => {
  currentStep.value = (currentStep.value + 1) % stepList.length
}
const getStatusIndex = (status: DemandOrderStatus): number => {
  return stepList.findIndex(s => s === status)
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const router = useRouter()
const back = () => {
  router.push({ name: 'order-products' })
}

onMounted(() => {
  try {
    executeGetDemandOrderDetailAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.demand-order-detail-root-container {
  @apply flex flex-col p-10;

  .step {
    @apply mb-10;
  }

  .btn-container {
    @apply flex flex-row justify-center items-center mt-10;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .step {
      @apply hidden;
    }

    .btn-container {
      .btn {
        @apply flex-1;
      }
    }
  }
}
</style>
