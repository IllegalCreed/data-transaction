<template>
  <div ref="root" class="product-item-root-container" @click="handleClick">
    <div class="header">
      <span class="no">{{
        `${isWidth ? '订单编号：' : '# '}${order.orderNum}`
      }}</span>
      <span class="time">下单时间：{{ order.purchaseDate }}</span>
    </div>
    <div class="content">
      <img :src="order.imageUrl" />

      <div flex flex-col flex-1>
        <span class="title">{{ order.name }}</span>

        <div class="props-container">
          <div class="price-container">
            <el-tag size="small">{{ mappedTypes }}</el-tag>
            <div class="price">
              {{ `￥${order.paymentAmount}` }}
            </div>
          </div>

          <div class="time-container">
            <div v-if="isWidth" flex flex-row items-center>
              <div
                class="col-container"
                v-if="order.status === ProductOrderStatus.ToDeliver"
              >
                <span class="label">预计交付时间</span
                ><span class="value">{{ order.expectedDeliveryDate }}</span>
              </div>
              <div
                class="col-container"
                v-else-if="order.status === ProductOrderStatus.ToCheck"
              >
                <span class="label">实际交付时间</span
                ><span class="value">{{ order.actualDeliveryDate }}</span>
              </div>
            </div>
          </div>

          <div class="state-container">
            <div class="col-container">
              <span class="label">订单状态</span>
              <span
                class="value"
                :style="{
                  color:
                    order.status === ProductOrderStatus.Completed
                      ? 'var(--color-up-arrow)'
                      : 'var(--color-price)',
                }"
              >
                {{ mappedStatus }}
              </span>
            </div>
          </div>

          <div class="product-item-actions" flex-1>
            <el-button class="detail-btn" size="small" @click="viewDetails"
              >查看详情</el-button
            >
            <el-button
              v-if="order.status === ProductOrderStatus.Contract"
              size="small"
              type="primary"
              @click="signContract"
            >
              签署合同
            </el-button>
            <el-button
              v-else-if="order.status === ProductOrderStatus.ToCheck"
              size="small"
              type="success"
              @click="confirmDelivery"
            >
              确认交付
            </el-button>
            <el-button
              v-else-if="order.status === ProductOrderStatus.ToReview"
              size="small"
              type="warning"
              @click="reviewOrder"
            >
              评价订单
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePxRemConverter } from '@/composables/fontUnitUtils/usePxRemConverter'
import { ProductOrderStatus, type IOrderProduct } from '@/types/productOrder'
const { order } = defineProps<{
  order: IOrderProduct
}>()

const root = useTemplateRef('root')
const { width: rawWidth } = useElementSize(root)
const { pxToRem } = usePxRemConverter()
const isWidth = computed(() => {
  return pxToRem(rawWidth.value).value > 35
})

import { PRODUCT_ORDER_STATUS_MAP } from '@/types/productOrder'

const mappedStatus = computed(
  () => PRODUCT_ORDER_STATUS_MAP[order.status] || '待审核',
)

import { PRODUCT_TYPE_MAP } from '@/types/productOrder'

const mappedTypes = computed(() => PRODUCT_TYPE_MAP[order.type] || '数据集')

const router = useRouter()
const viewDetails = () => {
  router.push({
    name: 'order-products-detail',
    params: {
      id: order.id,
    },
  })
}

const handleClick = () => {
  if (isMobileDevice.value) {
    viewDetails()
  }
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const signContract = () => {
  console.log('签署合同', order)
}

const confirmDelivery = () => {
  console.log('确认交付', order)
}

const reviewOrder = () => {
  console.log('评价订单', order)
}
</script>

<style scoped lang="scss">
.product-item-root-container {
  @apply flex flex-col border-solid border border-[var(--color-border)];

  .header {
    @apply flex flex-row items-center justify-between gap-2 px-4 h-10 bg-[var(--color-order-header-background)];

    .no {
      @apply text-sm;

      @media (max-width: 30rem) {
        @apply text-xs;
      }
    }

    .time {
      @apply text-sm text-[--color-text-lighter];

      @media (max-width: 30rem) {
        @apply text-xs;
      }
    }

    @media (max-width: 35rem) {
      @apply flex-col h-15 items-start justify-center;
    }

    @media (max-width: 25rem) {
      @apply p-2;
    }
  }

  .content {
    @apply flex flex-row gap-4 p-4;

    img {
      @apply object-contain h-30 w-30 rounded;
    }

    .title {
      @apply text-lg font-bold line-clamp-2;
    }

    .props-container {
      @apply flex flex-row flex-1 items-center;

      .price-container {
        @apply flex flex-col items-start flex-1 gap-1;

        .price {
          @apply text-xl text-[--color-price] font-bold;
        }
      }

      .col-container {
        @apply flex flex-col items-center gap-2;

        .label,
        .value {
          @apply text-sm;
        }

        .label {
          @apply font-bold;
        }
      }

      .time-container {
        @apply flex-1;

        @media (max-width: 40rem) {
          @apply hidden;
        }
      }

      .state-container {
        @apply flex-1;

        @media (max-width: 40rem) {
          .label {
            @apply hidden;
          }

          .value {
            @apply self-end;
          }
        }
      }

      .product-item-actions {
        @apply flex flex-col items-end gap-2;

        button {
          @apply ml-0 w-20;
        }

        @media (max-width: 40rem) {
          @apply hidden;
        }
      }
    }

    @media (max-width: 30rem) {
      img {
        @apply h-20 w-20;
      }

      .title {
        @apply text-sm;
      }

      .props-container {
        .price-container {
          .el-tag {
            @apply hidden;
          }

          .price {
            @apply text-base;
          }
        }
      }
    }
  }

  @media (max-width: 40rem) {
    @apply cursor-pointer;
  }
}
</style>
