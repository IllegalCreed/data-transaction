<template>
  <div class="demand-order-company-selector-root-container">
    <common-tabbar v-model="currentPage" :links="links" class="tabbar" />

    <div v-if="currentPage === 'tender'" class="company-list-container">
      <el-skeleton
        :loading="getDemandOrderTenderCompaniesActionLoading"
        animated
      >
        <template #template>
          <div flex flex-col gap-4>
            <el-skeleton-item
              v-for="n in 3"
              :key="n"
              variant="rect"
              class="!h-30"
            ></el-skeleton-item>
          </div>
        </template>
        <template #default>
          <company-item
            v-for="(item, index) in tenderCompanies"
            :key="index"
            :company="item"
          ></company-item>
        </template>
      </el-skeleton>
    </div>

    <div v-else class="company-list-container">
      <el-skeleton
        :loading="getDemandOrderRecommendCompaniesActionLoading"
        animated
      >
        <template #template>
          <div flex flex-col gap-4>
            <el-skeleton-item
              v-for="n in 3"
              :key="n"
              variant="rect"
              class="!h-30"
            ></el-skeleton-item>
          </div>
        </template>
        <template #default>
          <company-item
            v-for="(item, index) in recommendCompanies"
            :key="index"
            :company="item"
          ></company-item>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompanyItem from './DemandOrderCompanyItem.vue'
import CommonTabbar from '@/components/CommonTabbar.vue'
const { orderId } = defineProps<{
  orderId: number | string
}>()

const currentPage = ref('tender')

const links = ref([
  {
    id: 'tender',
    label: '投标商家',
  },
  {
    id: 'recommend',
    label: '推荐商家',
  },
])

import { useOrderStore } from '@/stores/modules/order'
const orderStore = useOrderStore()
const {
  getDemandOrderTenderCompanies: getDemandOrderTenderCompaniesAction,
  getDemandOrderRecommendCompanies: getDemandOrderRecommendCompaniesAction,
} = orderStore

const {
  state: tenderCompanies,
  isLoading: getDemandOrderTenderCompaniesActionLoading,
  execute: executeGetDemandOrderTenderCompaniesAction,
} = useAsyncState(() => getDemandOrderTenderCompaniesAction(orderId), undefined)

const {
  state: recommendCompanies,
  isLoading: getDemandOrderRecommendCompaniesActionLoading,
  execute: executeGetDemandOrderRecommendCompaniesAction,
} = useAsyncState(
  () => getDemandOrderRecommendCompaniesAction(orderId),
  undefined,
)

onMounted(() => {
  try {
    executeGetDemandOrderTenderCompaniesAction()
    executeGetDemandOrderRecommendCompaniesAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.demand-order-company-selector-root-container {
  @apply flex flex-col gap-4;

  .tabbar {
    @apply self-center w-70;
  }

  .company-list-container {
    @apply flex flex-col gap-4 mt-5;
  }
}
</style>
