<template>
  <div class="demand-detail-root-container">
    <div class="demand-detail-main">
      <div flex flex-col bg-slate-100 p-8 rounded>
        <span text-2xl font-bold>{{ name }}</span>
        <div flex flex-row flex-wrap gap-2 mt-2>
          <el-tag v-for="(tag, index) in tags" :key="index" type="danger" size="small">
            {{ tag }}
          </el-tag>
        </div>
        <el-divider type="dashed" />
        <span text-gray-500 text-sm>{{ shortDesc }}</span>
        <el-divider type="dashed" />
        <el-descriptions title="需求细节">
          <el-descriptions-item label="状态">
            <el-tag :type="status === '进行中' ? 'success' : 'info'" size="small">
              {{ status }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="交易模式">{{ transactionMode?.type }}</el-descriptions-item>
          <el-descriptions-item label="付款方式">{{ paymentMethod }}</el-descriptions-item>
          <el-descriptions-item label="预算金额">{{ budget }} 元</el-descriptions-item>
          <el-descriptions-item label="发布者">{{ publisher }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ publishDate }}</el-descriptions-item>
          <el-descriptions-item label="预期完成时间">{{
            expectedCompletionDate
          }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <tab-bar
        mt-10
        :links="sections.map((section: ISection) => ({ id: section.id, label: section.label }))"
      />

      <div class="content-sections">
        <section v-for="section in sections" :id="section.id" :key="section.id">
          <span>{{ section.label }}</span>
          <component :is="section.component" v-bind="section.props" />
        </section>
      </div>
    </div>

    <control-panel :demand-id="demandId" class="control-panel" />

    <div class="demand-detail-footer">
      <el-button flex-1 type="default" size="large" @click="addToFav">收藏产品</el-button>
      <el-button flex-1 type="primary" size="large" @click="isOrderDialogVisiable = true"
        >立即下单</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
import TabBar from '@/components/TabBar.vue'
import DetailsSection from './DetailsSection.vue'
import SafetySection from './SafetySection.vue'
import RecommendationsSection from './RecommendationsSection.vue'
import type { TransactionMode } from '@/types/demand'
import type { ISection } from '@/types/section'

const isOrderDialogVisiable = ref(false)

const addToFav = () => {
  console.log(`将 ${demandId} 添加到收藏夹`)
}

const route = useRoute()
const demandId = ref(route.params.id ? (route.params.id as string) : '')

const name = ref('')
const shortDesc = ref('')
const tags = ref<string[]>([])
const transactionMode = ref<TransactionMode>()
const budget = ref(0.0)
const publisher = ref('ABC 科技公司')
const status = ref('进行中') // 状态
const paymentMethod = ref('按项目付款') // 付款方式
const publishDate = ref('2024-01-10') // 发布时间
const expectedCompletionDate = ref('2024-12-31') // 预期完成时间

const sections = ref<ISection[]>([
  {
    id: 'details',
    label: '产品详情',
    component: markRaw(DetailsSection),
    props: { demandId: demandId.value }
  },
  { id: 'safety', label: '安全保障', component: markRaw(SafetySection), props: {} },
  {
    id: 'recommendations',
    label: '相似需求',
    component: markRaw(RecommendationsSection),
    props: { demandId: demandId.value }
  }
])

const fetchData = () => {
  // 这里放置获取数据的逻辑
  console.log(`Fetching data for product ID: ${demandId.value}`)

  name.value = '高性能企业级网站开发需求'
  shortDesc.value =
    '我们正在寻找一家经验丰富的开发团队，帮助我们打造一个高性能、可扩展的企业级网站。这个网站将作为我们公司数字化转型的重要组成部分，需要具有现代化的用户界面、强大的后端功能，以及能够支持高并发用户访问的架构。开发团队应具备丰富的全栈开发经验，能够从前端设计、后端开发到数据库管理全面把控项目进度。同时，我们希望该网站能够无缝集成第三方服务，如支付网关、客户关系管理系统，以及营销自动化工具，以便我们能够更好地服务客户、提升运营效率。此外，开发团队需具备良好的沟通能力，能够与我们的内部团队密切合作，确保项目的每一个阶段都符合我们的商业目标和技术规范。预计完成时间为2024年底，预算为150,000元。'
  tags.value = ['开发', 'Web', '企业级']
  transactionMode.value = { type: '招标', tenderType: '按项目' }
  budget.value = 150000.0
  publisher.value = 'ABC 科技公司'
  status.value = '进行中'
  paymentMethod.value = '按项目付款'
  publishDate.value = '2024-01-10'
  expectedCompletionDate.value = '2024-12-31'
}

onMounted(() => {
  fetchData()
})

watch(
  () => route.params.id,
  (newId) => {
    demandId.value = newId as string
    fetchData() // 每当ID变化时重新获取数据
  }
)
</script>

<style scoped lang="scss">
.demand-detail-root-container {
  @apply flex flex-row items-start max-w-300 mx-auto px-10;

  .demand-detail-main {
    @apply flex-1 pr-8 mt-10 min-w-0;
  }

  :deep(.el-descriptions__body) {
    @apply bg-transparent;
  }

  @media (max-width: 75rem) {
    .demand-detail-main {
      @apply pr-0;
    }
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}

.content-sections {
  @apply pt-10;

  section {
    @apply mb-16;
  }

  section > span {
    @apply block relative h-10 text-5 leading-10 font-bold text-dark mb-4 pl-4 bg-slate-100 rounded-r;

    &::before {
      @apply absolute bg-orange-500 h-10 top-0 left-0 w-1 content-[''];
    }
  }
}

.control-panel {
  @media (max-width: 75rem) {
    @apply hidden;
  }
}

.demand-detail-footer {
  @apply hidden flex-row items-center px-10 fixed bottom-0 left-0 right-0 h-15 min-w-80 bg-white border-t-1 border-t-solid border-t-gray-200 z-20;

  @media (max-width: 75rem) {
    @apply flex;
  }

  @media (max-width: 40rem) {
    @apply px-5;
  }
}
</style>
