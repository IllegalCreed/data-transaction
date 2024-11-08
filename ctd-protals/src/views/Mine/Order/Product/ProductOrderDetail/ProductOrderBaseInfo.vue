<template>
  <div class="product-order-detail-baseinfo-root-container">
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
          <el-image
            :src="orderDetails.imageUrl"
            fit="contain"
            :preview-src-list="[orderDetails.imageUrl ?? '']"
            lazy
            class="product-image"
          >
            <template #error>
              <div
                bg-gray-300
                w-40
                h-40
                rounded
                flex
                justify-center
                items-center
              >
                <i-lets-icons:img-box
                  text-gray-400
                  w-15
                  h-15
                ></i-lets-icons:img-box>
              </div>
            </template>
          </el-image>

          <div flex-1 flex flex-col gap-2>
            <span class="title">{{ orderDetails.name }}</span>

            <div flex flex-row gap-2>
              <el-tag size="small" disable-transitions>
                {{ mappedProductType }}
              </el-tag>
              <el-tag size="small" disable-transitions>
                {{ mappedStatus }}
              </el-tag>
            </div>

            <span class="desc">{{ orderDetails.description }}</span>

            <div flex-1></div>

            <div flex flex-col gap-1>
              <div flex flex-row items-center>
                <span class="label">下单时间：</span>
                <span class="value">{{ orderDetails.purchaseDate }}</span>
              </div>
              <div v-if="showExpectedDeliveryTime" flex flex-row items-center>
                <span class="label">预计交付时间：</span>
                <span class="value">{{
                  orderDetails.expectedDeliveryDate
                }}</span>
              </div>
              <div v-if="showActualDeliveryTime" flex flex-row items-center>
                <span class="label">实际交付时间：</span>
                <span class="value">{{ orderDetails.actualDeliveryDate }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="specifications-container">
          <span class="label">规格：</span>
          <div flex flex-row flex-wrap flex-1 gap-2>
            <div
              v-for="(spec, index) in orderDetails.specifications"
              :key="index"
              :spec="spec"
              rounded
              bg-slate-100
              px-2
              py-1
              text-xs
            >
              <div>
                <span>{{ spec.key }}：</span>
                <span>{{ spec.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div flex flex-row items-center v-if="orderDetails.hasCount">
          <span class="label">数量：</span>
          <span class="value">{{ orderDetails.count }}</span>
        </div>

        <div flex flex-row items-center>
          <span class="label">商家名称：</span>
          <span class="value">{{ orderDetails.sellerName }}</span>
        </div>

        <div flex flex-row items-center>
          <span class="label">支付金额：</span>
          <span class="price">￥{{ orderDetails.paymentAmount }}</span>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import {
  ProductOrderStatus,
  type IOrderProductDetail,
} from '@/types/productOrder'

const { orderDetails } = defineProps<{
  orderDetails: IOrderProductDetail
  loading: boolean
}>()

const showExpectedDeliveryTime = computed(
  () => orderDetails.status === ProductOrderStatus.ToDeliver,
)
const showActualDeliveryTime = computed(() =>
  [
    ProductOrderStatus.ToCheck,
    ProductOrderStatus.ToReview,
    ProductOrderStatus.Completed,
  ].includes(orderDetails.status),
)

import {
  PRODUCT_ORDER_STATUS_MAP,
  PRODUCT_TYPE_MAP,
} from '@/types/productOrder'

const mappedStatus = computed(
  () => PRODUCT_ORDER_STATUS_MAP[orderDetails.status] || '待审核',
)
const mappedProductType = computed(
  () => PRODUCT_TYPE_MAP[orderDetails.type] || '数据集',
)
</script>

<style scoped lang="scss">
.product-order-detail-baseinfo-root-container {
  @apply flex flex-col gap-4;

  .header-container {
    @apply flex flex-row gap-4;

    .title {
      @apply text-xl font-bold;
    }

    .desc {
      @apply text-sm text-[var(--color-text-light)];
    }

    .product-image {
      @apply rounded max-w-40 h-40 bg-gray-100;
    }
  }

  .specifications-container {
    @apply flex flex-row;
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

  @media (max-width: 40rem) {
    @apply p-0;

    .header-container {
      @apply flex-col;

      .product-image {
        @apply max-w-full h-60;
      }
    }

    .specifications-container {
      @apply flex-col gap-2;
    }
  }
}
</style>
