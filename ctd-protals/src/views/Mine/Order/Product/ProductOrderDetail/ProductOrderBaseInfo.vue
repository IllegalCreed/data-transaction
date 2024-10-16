<template>
  <div class="product-order-detail-baseinfo-root-container">
    <div class="header-container">
      <el-image
        :src="orderDetails.productImageUrl"
        fit="contain"
        :preview-src-list="[orderDetails.productImageUrl]"
        lazy
        class="product-image"
      >
        <template #error>
          <div bg-gray-300 w-50 h-50 rounded flex justify-center items-center>
            <i-lets-icons:img-box text-gray-400 w-15 h-15></i-lets-icons:img-box>
          </div>
        </template>
      </el-image>

      <div flex-1 flex flex-col gap-2>
        <span text-2xl font-bold>{{ orderDetails.productName }}</span>

        <div flex flex-row gap-2>
          <el-tag :type="productTypeTagType" disable-transitions>
            {{ mappedProductType }}
          </el-tag>
          <el-tag :type="statusTagType" disable-transitions>
            {{ mappedStatus }}
          </el-tag>
        </div>

        <span text-sm text-gray-500>{{ orderDetails.productDescription }}</span>

        <div flex-1></div>

        <div flex flex-col gap-1>
          <div flex flex-row items-center text-slate-500 text-sm>
            <strong>下单时间：</strong>
            <span>{{ orderDetails.orderTime }}</span>
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

    <div class="specifications-container">
      <span text-base font-bold>规格：</span>
      <div flex flex-row flex-1 gap-2>
        <div
          v-for="(spec, index) in orderDetails.specifications"
          :key="index"
          :spec="spec"
          rounded
          bg-slate-100
          px-2
          py-1
          text-sm
        >
          <div>
            <span>{{ spec.key }}：</span>
            <span>{{ spec.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-container">
      <div flex flex-row items-center>
        <span text-base font-bold>商家名称：</span>
        <span text-base text-gray-500>{{ orderDetails.merchantName }}</span>
      </div>

      <span font-bold text-red-500 text-2xl>￥{{ orderDetails.paymentAmount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrderProductDetails, ProductOrderStatus } from '@/types/product'

const { orderId, status } = defineProps<{
  orderId: number
  status: ProductOrderStatus
}>()

const orderDetails = ref<IOrderProductDetails>({
  orderId: orderId,
  productName: '高级数据分析平台',
  productDescription: '一个功能全面的数据分析平台，适用于大规模数据处理。',
  productImageUrl: 'https://via.placeholder.com/200', // 产品图片 URL
  productType: 1, // 1: API
  specifications: [
    { key: '数量', value: 5 },
    { key: '购买形式', value: '一次性购买' }
  ],
  status: status, // 5: 已评价
  merchantName: '数据科技有限公司',
  paymentAmount: 999.99,
  orderTime: '2024-03-15 09:00:00',
  expectedDeliveryDate: '2024-03-25 17:00:00',
  actualDeliveryDate: '2024-03-24 16:30:00' // 实际交付时间
})

watchEffect(() => {
  orderDetails.value.status = status
})

const showExpectedDeliveryTime = computed(() => orderDetails.value.status === 2) // 待交付
const showActualDeliveryTime = computed(
  () => [3, 4, 5].includes(orderDetails.value.status) // 待验查、待评价、已评价
)

import {
  PRODUCT_ORDER_STATUS_MAP,
  PRODUCT_ORDER_STATUS_TAG_TYPE,
  PRODUCT_TYPE_MAP,
  PRODUCT_TYPE_TAG_TYPE
} from '@/constants/productOrder'

const mappedStatus = computed(() => PRODUCT_ORDER_STATUS_MAP[orderDetails.value.status] || '待审核')
const statusTagType = computed(
  () => PRODUCT_ORDER_STATUS_TAG_TYPE[orderDetails.value.status] || 'info'
)
const mappedProductType = computed(
  () => PRODUCT_TYPE_MAP[orderDetails.value.productType] || '数据集'
)
const productTypeTagType = computed(
  () => PRODUCT_TYPE_TAG_TYPE[orderDetails.value.productType] || 'success'
)
</script>

<style scoped lang="scss">
.product-order-detail-baseinfo-root-container {
  @apply flex flex-col border-solid border border-gray-100 rounded px-10 py-6 bg-white shadow-md gap-4;

  .header-container {
    @apply flex flex-row gap-4;

    .product-image {
      @apply rounded max-w-50 h-50 bg-gray-100;
    }
  }

  .specifications-container {
    @apply flex flex-row;
  }

  .footer-container {
    @apply flex flex-row items-center justify-between;
  }

  @media (max-width: 40rem) {
    @apply p-0 pb-10 shadow-none border-0 border-b border-gray-200;

    .header-container {
      @apply flex-col;

      .product-image {
        @apply max-w-full;
      }
    }

    .specifications-container {
      @apply flex-col gap-2;
    }

    .footer-container {
      @apply flex-col items-start gap-6;
    }
  }
}
</style>
