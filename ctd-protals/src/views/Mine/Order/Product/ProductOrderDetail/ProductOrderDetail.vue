<template>
  <div class="product-order-detail-root-container">
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
      <product-order-base-info
        :orderDetails="orderDetails"
        :loading="getProductOrderDetailActionLoading"
        flex-1
      />
      <el-skeleton
        :loading="getProductOrderDetailActionLoading"
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

    <product-order-contract-info
      v-if="currentStep > getStatusIndex(ProductOrderStatus.Pending)"
      :orderId="orderId"
    />

    <el-divider
      v-if="currentStep > getStatusIndex(ProductOrderStatus.Pending)"
    />

    <product-order-review-info
      v-if="currentStatus === ProductOrderStatus.Completed"
      :orderId="orderId"
    />

    <div class="btn-container">
      <el-button
        class="btn"
        v-if="currentStatus === ProductOrderStatus.Pending"
        type="primary"
        size="large"
        >签署合同</el-button
      >
      <el-button
        class="btn"
        v-if="currentStatus === ProductOrderStatus.ToCheck"
        type="primary"
        size="large"
        >确认交付</el-button
      >
      <el-button
        class="btn"
        v-if="currentStatus === ProductOrderStatus.ToReview"
        type="primary"
        size="large"
        >评价订单</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PRODUCT_ORDER_STATUS_MAP,
  ProductOrderStatus,
  ProductType,
} from '@/types/productOrder'
import ProductOrderBaseInfo from './ProductOrderBaseInfo.vue'
import ProductOrderContractInfo from './ProductOrderContractInfo.vue'
import ProductOrderReviewInfo from './ProductOrderReviewInfo.vue'

import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const { getProductOrderDetail: getProductOrderDetailAction } = orderStore

const orderId = useRouteParams<string>('id', '')
watch(
  () => orderId,
  () => {
    executeGetProductOrderDetailAction()
  },
)

const {
  state: orderDetails,
  isLoading: getProductOrderDetailActionLoading,
  execute: executeGetProductOrderDetailAction,
} = useAsyncState(
  () => getProductOrderDetailAction(orderId.value),
  {
    id: 0,
    orderNum: '',
    name: '',
    description: '',
    imageUrl: '',
    type: ProductType.Dataset,
    specifications: [],
    hasCount: false,
    count: 0,
    status: ProductOrderStatus.Pending,
    sellerId: 0,
    sellerName: '',
    paymentAmount: 0,
    purchaseDate: '',
    expectedDeliveryDate: '',
    actualDeliveryDate: '',
  },
  { shallow: false },
)

// 枚举数组
const stepList = Object.values(ProductOrderStatus)

// 中文映射数组
const steps = stepList.map(status => ({
  title: PRODUCT_ORDER_STATUS_MAP[status],
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
const getStatusIndex = (status: ProductOrderStatus): number => {
  return stepList.findIndex(s => s === status)
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const router = useRouter()
const back = () => {
  router.push({ name: 'order-products' })
}

onMounted(() => {
  try {
    executeGetProductOrderDetailAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.product-order-detail-root-container {
  @apply flex flex-col p-10;

  .back-btn {
    @apply flex flex-row items-center gap-2 cursor-pointer select-none;

    span {
      @apply line-height-none;
    }
  }

  .step {
    @apply h-auto ml-5 mr-10;

    :deep(.is-process) {
      @apply text-[var(--color-primary)] border-[var(--color-primary)];
    }

    @media (max-width: 50rem) {
      @apply hidden;
    }
  }

  .btn-container {
    @apply flex flex-row justify-center items-center mt-10;

    .btn {
      @apply w-40;
    }
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .btn-container {
      .btn {
        @apply flex-1;
      }
    }
  }
}
</style>
