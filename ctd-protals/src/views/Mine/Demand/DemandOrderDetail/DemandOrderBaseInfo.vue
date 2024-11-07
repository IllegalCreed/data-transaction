<template>
  <div class="demand-order-detail-baseinfo-root-container">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div flex flex-col gap-4>
          <el-skeleton-item variant="rect" class="!h-40"></el-skeleton-item>
          <el-skeleton-item
            v-for="n in 5"
            :key="n"
            variant="p"
          ></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="header-container">
          <div flex flex-row items-center gap-4>
            <span class="title">{{ orderDetails.title }}</span>
            <i-bx:edit
              v-if="
                orderDetails.status === DemandOrderStatus.Pending ||
                orderDetails.status === DemandOrderStatus.Bidding
              "
              class="icon"
              @click="handleEdit"
            ></i-bx:edit>
          </div>

          <div class="tag-container">
            <el-tag
              v-for="(tag, index) in orderDetails.tags"
              :key="index"
              type="primary"
              size="small"
            >
              {{ tag }}
            </el-tag>
          </div>

          <span class="desc">{{ orderDetails.description }}</span>

          <div flex-1></div>

          <div class="base-info-container">
            <div flex flex-row items-center>
              <span class="label">创建时间：</span>
              <span class="value">{{ orderDetails.createTime }}</span>
            </div>
            <div v-if="showExpectedDeliveryTime" flex flex-row items-center>
              <span class="label">预计交付时间：</span>
              <span class="value">{{ orderDetails.expectedDeliveryDate }}</span>
            </div>
            <div v-if="showActualDeliveryTime" flex flex-row items-center>
              <span class="label">实际交付时间：</span>
              <span class="value">{{ orderDetails.actualDeliveryDate }}</span>
            </div>
          </div>
        </div>

        <div class="base-info-container">
          <div flex flex-row items-center>
            <span class="label">交易类型：</span>
            <span class="value">{{ mappedTransactionMode }}</span>
          </div>
          <div flex flex-row items-center>
            <span class="label">付款方式：</span>
            <span class="value">
              {{ mappedPayType }}
            </span>
          </div>
          <div flex flex-row items-center>
            <span class="label">进度：</span>
            <span class="value">{{ mappedStatus }}</span>
          </div>
          <div flex flex-row items-center>
            <span class="label">状态：</span>
            <span class="value">{{ mappedActiveStatus }}</span>
          </div>
          <div flex flex-row items-center>
            <span class="label">预算：</span>
            <span class="price"> ￥{{ orderDetails.budget }} </span>
          </div>
        </div>

        <div
          class="btn-container"
          v-if="
            orderDetails.status === DemandOrderStatus.Pending ||
            orderDetails.status === DemandOrderStatus.Bidding
          "
        >
          <el-button
            class="btn"
            @click="handleChangeActiveStatus"
            :type="
              orderDetails.activeStatus === ActiveStatus.Enabled
                ? 'warning'
                : 'success'
            "
            >{{
              orderDetails.activeStatus === ActiveStatus.Enabled
                ? '停用'
                : '启用'
            }}</el-button
          >
          <el-button @click="handleDelete" class="btn" type="danger"
            >删除</el-button
          >
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import {
  PAY_TYPE_MAP,
  TRANSACTION_MODE_MAP,
  TransactionMode,
} from '@/types/demand'
import { DEMAND_ORDER_STATUS_MAP } from '@/types/demandOrder'
import { DemandOrderStatus, type IOrderDemandDetail } from '@/types/demandOrder'
import { ACTIVE_STATUS_MAP, ActiveStatus } from '@/types/common'

const { orderDetails } = defineProps<{
  orderDetails: IOrderDemandDetail
  loading: boolean
}>()

const showExpectedDeliveryTime = computed(
  () => orderDetails.status === DemandOrderStatus.ToDeliver,
)
const showActualDeliveryTime = computed(() =>
  [
    DemandOrderStatus.ToCheck,
    DemandOrderStatus.ToReview,
    DemandOrderStatus.Completed,
  ].includes(orderDetails.status),
)

const mappedStatus = computed(
  () => DEMAND_ORDER_STATUS_MAP[orderDetails.status] || '待审核',
)
const mappedActiveStatus = computed(
  () => ACTIVE_STATUS_MAP[orderDetails.activeStatus] || '启动',
)
const mappedTransactionMode = computed(
  () => TRANSACTION_MODE_MAP[orderDetails.transactionType.mode] || '招标',
)
const mappedPayType = computed(() => {
  if (orderDetails.transactionType.mode === TransactionMode.Tender) {
    return PAY_TYPE_MAP[orderDetails.transactionType.payType] || '一口价'
  } else {
    return '--'
  }
})

const emit = defineEmits(['edit', 'changeActiveStatus', 'delete'])
const handleEdit = () => {
  emit('edit')
}

const handleChangeActiveStatus = () => {
  emit('changeActiveStatus')
}

const handleDelete = () => {
  emit('delete')
}
</script>

<style scoped lang="scss">
.demand-order-detail-baseinfo-root-container {
  @apply flex flex-col gap-4;

  .header-container {
    @apply flex flex-col gap-4;

    .title {
      @apply text-xl font-bold;
    }

    .desc {
      @apply text-sm text-[var(--color-text-light)];
    }

    .tag-container {
      @apply flex flex-row flex-wrap gap-2;
    }

    .icon {
      @apply w-6 h-6 cursor-pointer text-[var(--color-primary)];
    }
  }

  .base-info-container {
    @apply grid grid-cols-2 gap-4;
  }

  .price {
    @apply text-2xl text-[var(--color-price)] font-bold;
  }

  .label {
    @apply text-sm text-[var(--color-text-lighter)];
  }

  .value {
    @apply text-sm text-[var(--color-text)];
  }

  .btn-container {
    @apply flex flex-row gap-4 mt-10;

    .btn {
      @apply ml-0 w-20;
    }
  }

  @media (max-width: 40rem) {
    @apply p-0;

    .header-container {
      @apply flex-col;
    }

    .base-info-container {
      @apply grid-cols-1;
    }
  }
}
</style>
