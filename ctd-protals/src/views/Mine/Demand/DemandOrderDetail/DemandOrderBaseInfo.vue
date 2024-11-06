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
          <div flex-1 flex flex-col gap-2>
            <span text-2xl font-bold>{{ orderDetails.title }}</span>

            <div flex flex-row gap-2>
              <el-tag disable-transitions>
                {{ mappedActiveStatus }}
              </el-tag>
              <el-tag disable-transitions>
                {{ mappedStatus }}
              </el-tag>
            </div>

            <span text-sm text-gray-500>{{ orderDetails.description }}</span>

            <div flex-1></div>

            <div flex flex-col gap-1>
              <div flex flex-row items-center text-slate-500 text-sm>
                <strong>创建时间：</strong>
                <span>{{ orderDetails.createTime }}</span>
              </div>
              <div
                v-if="showExpectedDeliveryTime"
                flex
                flex-row
                items-center
                text-slate-500
                text-sm
              >
                <strong>预计交付时间：</strong>
                <span>{{ orderDetails.expectedDeliveryDate }}</span>
              </div>
              <div
                v-if="showActualDeliveryTime"
                flex
                flex-row
                items-center
                text-slate-500
                text-sm
              >
                <strong>实际交付时间：</strong>
                <span>{{ orderDetails.actualDeliveryDate }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="base-info-container">
          <div>
            <strong>交易类型：</strong> {{ orderDetails.transactionType.mode }}
          </div>
          <div>
            <strong>付款方式：</strong>
            {{
              orderDetails.transactionType.mode === TransactionMode.Tender
                ? orderDetails.transactionType.payType
                : ''
            }}
          </div>
          <div><strong>预算：</strong> {{ orderDetails.budget }}</div>
        </div>

        <div
          class="btn-container"
          v-if="
            orderDetails.status === DemandOrderStatus.Pending ||
            orderDetails.status === DemandOrderStatus.Bidding
          "
        >
          <el-button class="btn" type="primary">编辑</el-button>
          <el-button class="btn" type="primary">{{
            orderDetails.activeStatus === ActiveStatus.Enabled ? '停用' : '启用'
          }}</el-button>
          <el-button class="btn" type="primary">删除</el-button>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { TransactionMode } from '@/types/demand'
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

      .btn {
        @apply max-w-80;
      }
    }
  }
}
</style>
