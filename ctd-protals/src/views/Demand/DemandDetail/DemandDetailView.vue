<template>
  <div class="demand-detail-root-container">
    <div class="demand-detail-main">
      <demand-detail-info
        :demandId="demandId"
        :baseInfo="demandBaseInfo"
        :loading="getDemandActionLoading"
      ></demand-detail-info>

      <tab-bar
        mt-10
        :links="sections.map((section: ISection) => ({ id: section.id, label: section.label }))"
      />

      <section-panel mt-10 :sections="sections" />
    </div>

    <control-panel
      class="control-panel"
      :demandId="demandId"
      :baseInfo="demandBaseInfo"
      :loading="getDemandActionLoading"
    />

    <demand-detail-footer
      :demandId="demandId"
      :baseInfo="demandBaseInfo"
      :loading="getDemandActionLoading"
    ></demand-detail-footer>
  </div>
</template>

<script setup lang="ts">
import DemandDetailInfo from './DemandDetailInfo.vue'
import ControlPanel from './ControlPanel.vue'
import TabBar from '@/components/SectionTabBar.vue'
import SectionPanel from '@/components/SectionPanel.vue'
import DemandDetailFooter from './DemandDetailFooter.vue'

// 处理同路由跳转
const route = useRoute()
let demandId = route.params.id ? (route.params.id as string) : ''
watch(
  () => route.params.id,
  (newId) => {
    demandId = newId as string
    executeGetDemandAction()
  }
)

// 加载数据
import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { getDemand: getDemandAction } = demandStore

const {
  state: demandBaseInfo,
  isLoading: getDemandActionLoading,
  execute: executeGetDemandAction
} = useAsyncState(() => getDemandAction(demandId), {
  title: '',
  description: '',
  publisher: '',
  budget: 0,
  transactionType: { mode: TransactionMode.Tender, payType: PayType.ByFixedPrice },
  createTime: '',
  expectedDeliveryDate: '',
  status: DemandOrderStatus.Bidding,
  tags: []
})

onMounted(() => {
  try {
    executeGetDemandAction()
  } catch (error: unknown) {
    console.error(error)
  }
})

// 配置章节
import DetailsSection from './Section/DetailsSection.vue'
import SafetySection from './Section/SafetySection.vue'
import RecommendationsSection from './Section/RecommendationsSection.vue'
import type { ISection } from '@/types/section'
import { DemandOrderStatus, PayType, TransactionMode } from '@/types/demand'
const sections = ref<ISection[]>([
  {
    id: 'details',
    label: '产品详情',
    component: markRaw(DetailsSection),
    props: { demandId: demandId }
  },
  { id: 'safety', label: '安全保障', component: markRaw(SafetySection), props: {} },
  {
    id: 'recommendations',
    label: '相似需求',
    component: markRaw(RecommendationsSection),
    props: { demandId: demandId }
  }
])
</script>

<style scoped lang="scss">
.demand-detail-root-container {
  @apply self-center flex flex-row items-start max-w-320 px-10;

  .demand-detail-main {
    @apply flex-1 pr-8 mt-10 min-w-0;
  }

  .control-panel {
    @apply flex-shrink-0;
    @media (max-width: 65rem) {
      @apply hidden;
    }
  }

  @media (max-width: 82rem) {
    @apply self-stretch;
  }

  @media (max-width: 65rem) {
    @apply flex-col items-stretch w-full;

    .demand-detail-main {
      @apply pr-0;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
