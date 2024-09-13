<template>
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
    <el-descriptions title="需求细节" :column="descriptionColumn" :size="descriptionSize">
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
      <el-descriptions-item label="预期完成时间">{{ expectedCompletionDate }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import type { TransactionMode } from '@/types/demand'

const { demandId } = defineProps<{
  demandId: string
}>()

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

const fetchData = () => {
  // 这里放置获取数据的逻辑
  console.log(`Fetching data for product ID: ${demandId}`)

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

const descriptionSize = ref<'large' | 'default' | 'small'>('default')
const descriptionColumn = ref(3)
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    descriptionSize.value = 'small'
    descriptionColumn.value = 1
  } else {
    descriptionSize.value = 'default'
    descriptionColumn.value = 3
  }
})
</script>

<style lang="scss" scoped></style>
