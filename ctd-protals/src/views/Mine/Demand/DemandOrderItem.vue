<template>
  <div class="demand-item-root-container">
    <div flex flex-col items-stretch>
      <div flex flex-row justify-between gap-2>
        <span class="title">{{ order.title }}</span>
        <el-tag size="small" mt-1>{{ order.transactionMode.type }}</el-tag>
      </div>
      <span class="time" mt-2><strong>发布时间：</strong>{{ order.createTime }}</span>
      <span class="time" v-if="order.status === 'to_deliver'">
        <strong>预计交付时间：</strong>{{ order.expectedDeliveryDate }}
      </span>
      <span class="time" v-else-if="order.status === 'to_check'">
        <strong>实际交付时间：</strong>{{ order.actualDeliveryDate }}
      </span>
    </div>
    <div flex-1></div>
    <div class="demand-item-content">
      <el-tag :type="getTagType(order.status)" size="large">{{
        formatStatus(order.status)
      }}</el-tag>
      <div text-lg text-red-600 font-bold>￥{{ order.budget }}</div>
    </div>
    <div class="demand-item-actions">
      <el-button size="small" @click="viewDetails(order)">查看详情</el-button>
      <el-button
        v-if="order.status === 'bidding'"
        size="small"
        type="primary"
        @click="selectCompany(order)"
      >
        选择商家
      </el-button>
      <el-button
        v-if="order.status === 'contract'"
        size="small"
        type="primary"
        @click="signContract(order)"
      >
        签署合同
      </el-button>
      <el-button
        v-else-if="order.status === 'to_check'"
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
        评价商家
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrderDemand } from '@/types/demand'

defineProps<{
  order: IOrderDemand
}>()

// 格式化状态
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待审核',
    bidding: '投标/竞标中',
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
    bidding: 'primary',
    contract: 'warning',
    to_deliver: 'primary',
    to_check: 'success',
    pending_review: 'danger',
    reviewed: 'success'
  }
  return typeMap[status] || 'default'
}

// 操作按钮的方法
const viewDetails = (order: IOrderDemand) => {
  // 查看订单详情逻辑
  console.log('查看详情', order)
}

const selectCompany = (order: IOrderDemand) => {
  console.log('选择商家', order)
}

const signContract = (order: IOrderDemand) => {
  // 签署合同逻辑
  console.log('签署合同', order)
}

const confirmDelivery = (order: IOrderDemand) => {
  // 确认交付逻辑
  console.log('确认交付', order)
}

const reviewOrder = (order: IOrderDemand) => {
  // 评价订单逻辑
  console.log('评价订单', order)
}
</script>

<style scoped lang="scss">
.demand-item-root-container {
  @apply relative flex flex-col border-solid border border-gray-100 rounded p-5 pb-10 bg-white shadow-md;

  .title {
    @apply text-xl font-bold line-clamp-1;
  }

  .time {
    @apply text-sm text-gray-500;
  }

  .demand-item-content {
    @apply flex flex-row justify-between items-center my-4;
  }

  .demand-item-actions {
    @apply absolute flex flex-row items-center justify-end px-4 left-0 bottom-0 right-0 h-10 rounded-b bg-blueGray;
  }

  @media (max-width: 40rem) {
    .title {
      @apply text-lg;
    }

    .time {
      @apply text-xs;
    }
  }
}
</style>
