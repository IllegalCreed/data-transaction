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
        @change-active-status="changeActiveStatus"
        @delete="deleteOrder"
        @edit="openEditModal"
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

    <demand-order-content
      :orderId="orderId"
      :order-status="orderDetails.status"
      :loading="getDemandOrderDetailActionLoading"
    />

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
      v-if="currentStep > getStatusIndex(DemandOrderStatus.Bidding)"
      :orderId="orderId"
    />
    <el-divider
      v-if="currentStep > getStatusIndex(DemandOrderStatus.Bidding)"
    />

    <demand-order-review-info
      v-if="orderDetails.status === DemandOrderStatus.Completed"
      :orderId="orderId"
    />

    <div class="btn-container">
      <el-button
        v-if="orderDetails.status === DemandOrderStatus.Contract"
        type="primary"
        size="large"
        >签署合同</el-button
      >
      <el-button
        v-if="orderDetails.status === DemandOrderStatus.ToCheck"
        type="primary"
        size="large"
        >确认交付</el-button
      >
      <el-button
        v-if="orderDetails.status === DemandOrderStatus.ToReview"
        type="primary"
        size="large"
        >评价订单</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import DemandOrderBaseInfo from './DemandOrderBaseInfo.vue'
import DemandOrderContent from './DemandOrderContent.vue'
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

watch(
  () => currentStep.value,
  () => {
    orderDetails.value.status = stepList[currentStep.value]
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
  router.push({ name: 'my-demands' })
}

onMounted(async () => {
  try {
    await executeGetDemandOrderDetailAction()
    currentStep.value = getStatusIndex(orderDetails.value.status)
  } catch (error: unknown) {
    console.error(error)
  }
})

const changeActiveStatus = () => {
  orderDetails.value.activeStatus =
    orderDetails.value.activeStatus === ActiveStatus.Enabled
      ? ActiveStatus.Disabled
      : ActiveStatus.Enabled
}

const deleteOrder = () => {}

const openEditModal = () => {}
</script>

<style scoped lang="scss">
.demand-order-detail-root-container {
  @apply flex flex-col p-10;

  .back-btn {
    @apply flex flex-row items-center gap-2 cursor-pointer select-none;

    span {
      @apply line-height-none;
    }
  }

  .step {
    @apply h-auto ml-20 mr-10;

    :deep(.is-process) {
      @apply text-[var(--color-primary)] border-[var(--color-primary)];
    }

    @media (max-width: 50rem) {
      @apply hidden;
    }
  }

  .btn-container {
    @apply flex flex-row justify-center items-center mt-10;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .step {
      @apply hidden;
    }
  }
}
</style>
