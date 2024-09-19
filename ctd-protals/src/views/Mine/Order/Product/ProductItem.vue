<template>
  <div class="product-item-root-container">
    <div flex flex-row gap-5>
      <img :src="order.productImageUrl" />

      <div flex flex-col items-start>
        <span class="title">{{ order.productName }}</span>
        <el-tag size="small" mt-1>{{ order.type }}</el-tag>
        <div flex-1></div>
        <span class="time"><strong>下单时间：</strong>{{ order.purchaseDate }}</span>
        <span class="time" v-if="order.status === 'to_deliver'">
          <strong>预计交付时间：</strong>{{ order.expectedDeliveryDate }}
        </span>
        <span class="time" v-else-if="order.status === 'to_check'">
          <strong>实际交付时间：</strong>{{ order.actualDeliveryDate }}
        </span>
      </div>
    </div>
    <div class="product-item-content">
      <el-tag :type="getTagType(order.status)" size="large">{{
        formatStatus(order.status)
      }}</el-tag>
      <div text-lg text-red-600 font-bold>{{ order.price }}</div>
    </div>
    <div class="product-item-actions">
      <el-button size="small" @click="viewDetails(order)">查看详情</el-button>
      <el-button
        v-if="order.status === 'contract'"
        size="small"
        type="primary"
        @click="signContract(order)"
      >
        签署合同
      </el-button>
      <el-button
        v-else-if="order.status === 'to_deliver'"
        size="small"
        type="success"
        @click="confirmDelivery(order)"
      >
        确认交付
      </el-button>
      <el-button
        v-else-if="order.status === 'pending_review'"
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
import type { IOrderProduct } from '@/types/product'

defineProps<{
  order: IOrderProduct
}>()

// 格式化状态
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待审核',
    contract: '合同协商',
    to_deliver: '待交付',
    to_check: '待验查',
    pending_review: '待评价',
    reviewed: '已评价'
  }
  return statusMap[status] || '未知状态'
}

const getTagType = (status: string) => {
  const typeMap: Record<string, 'success' | 'warning' | 'info' | 'primary' | 'danger'> = {
    pending: 'info',
    contract: 'warning',
    to_deliver: 'primary',
    to_check: 'success',
    pending_review: 'danger',
    reviewed: 'success'
  }
  return typeMap[status] || 'default'
}

// 操作按钮的方法
const viewDetails = (order: IOrderProduct) => {
  // 查看订单详情逻辑
  console.log('查看详情', order)
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
