<template>
  <div class="product-item-root-container">
    <div flex flex-row gap-5>
      <img :src="order.productImageUrl" />

      <div flex flex-col items-start>
        <span class="title">{{ order.productName }}</span>
        <el-tag size="small" mt-1>{{ order.type }}</el-tag>
        <div flex-1></div>
        <span class="time"><strong>下单时间：</strong>{{ order.purchaseDate }}</span>
        <span class="time" v-if="order.status === ProductOrderStatus.ToDeliver">
          <strong>预计交付时间：</strong>{{ order.expectedDeliveryDate }}
        </span>
        <span class="time" v-else-if="order.status === ProductOrderStatus.ToCheck">
          <strong>实际交付时间：</strong>{{ order.actualDeliveryDate }}
        </span>
      </div>
    </div>
    <div class="product-item-content">
      <el-tag :type="statusTagType" size="large">{{ mappedStatus }}</el-tag>
      <div text-lg text-red-600 font-bold>{{ order.price }}</div>
    </div>
    <div class="product-item-actions">
      <el-button size="small" @click="viewDetails(order)">查看详情</el-button>
      <el-button
        v-if="order.status === ProductOrderStatus.Contract"
        size="small"
        type="primary"
        @click="signContract(order)"
      >
        签署合同
      </el-button>
      <el-button
        v-else-if="order.status === ProductOrderStatus.ToCheck"
        size="small"
        type="success"
        @click="confirmDelivery(order)"
      >
        确认交付
      </el-button>
      <el-button
        v-else-if="order.status === ProductOrderStatus.ToReview"
        size="small"
        type="warning"
        @click="reviewOrder(order)"
      >
        评价订单
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductOrderStatus, type IOrderProduct } from '@/types/product'

const { order } = defineProps<{
  order: IOrderProduct
}>()

import { PRODUCT_ORDER_STATUS_MAP, PRODUCT_ORDER_STATUS_TAG_TYPE } from '@/constants/productOrder'

const mappedStatus = computed(() => PRODUCT_ORDER_STATUS_MAP[order.status] || '待审核')
const statusTagType = computed(() => PRODUCT_ORDER_STATUS_TAG_TYPE[order.status] || 'info')

const router = useRouter()
const viewDetails = (order: IOrderProduct) => {
  router.push({
    name: 'order-products-detail',
    params: {
      id: order.id
    }
  })
}

const signContract = (order: IOrderProduct) => {
  // 签署合同逻辑
  console.log('签署合同', order)
}

const confirmDelivery = (order: IOrderProduct) => {
  // 确认交付逻辑
  console.log('确认交付', order)
}

const reviewOrder = (order: IOrderProduct) => {
  // 评价订单逻辑
  console.log('评价订单', order)
}
</script>

<style scoped lang="scss">
.product-item-root-container {
  @apply relative flex flex-col border-solid border border-gray-100 rounded p-5 pb-10 bg-white shadow-md;

  img {
    @apply object-contain h-30 w-30 rounded;
  }

  .title {
    @apply text-xl font-bold line-clamp-1;
  }

  .time {
    @apply text-sm text-gray-500;
  }

  .product-item-content {
    @apply flex flex-row justify-between items-center my-4;
  }

  .product-item-actions {
    @apply absolute flex flex-row items-center justify-end px-4 left-0 bottom-0 right-0 h-10 rounded-b bg-blueGray;
  }

  @media (max-width: 40rem) {
    img {
      @apply h-25 w-25;
    }

    .title {
      @apply text-lg;
    }

    .time {
      @apply text-xs;
    }
  }
}
</style>
