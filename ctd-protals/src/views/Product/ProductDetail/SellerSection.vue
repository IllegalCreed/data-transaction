<template>
  <div class="seller-section-root-container">
    <el-card body-class="seller-body-container" v-if="sellerInfo">
      <img :src="sellerInfo.logo" />
      <div flex flex-col flex-1 min-w-0>
        <span text-lg font-bold mb-2>{{ sellerInfo.name }}</span>
        <div flex flex-row flex-wrap items-center gap-2>
          <el-tag v-for="(tag, index) in sellerInfo.tags" :key="index" type="info">{{
            tag
          }}</el-tag>
        </div>
      </div>
      <el-button class="detail-btn" type="primary" @click="viewSellerDetails">查看详情</el-button>
    </el-card>

    <!-- 商家统计信息 -->
    <div v-if="sellerStats" class="stats-container">
      <div v-for="(stat, index) in sellerStats" :key="index" flex flex-col items-center>
        <span text-orange-500 block text-2xl font-bold mb-4>{{ stat.value }}</span>
        <span text-gray-500 text-sm>{{ stat.title }}</span>
      </div>
    </div>

    <!-- 商家富文本展示 -->
    <div v-if="sellerInfo" v-html="richTextContent" overflow-hidden></div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const props = defineProps<{
  sellerId: string
}>()

const router = useRouter()

const sellerInfo = ref<{
  logo: string
  name: string
  tags: string[]
} | null>(null)

const sellerStats = ref<{ title: string; value: string }[] | null>(null)

const richTextContent = ref<string | null>(null)

const fetchSellerInfo = async (id: string) => {
  console.log('mock get sellerInfo:', id)
  // 模拟 API 请求
  sellerInfo.value = {
    logo: 'https://via.placeholder.com/100',
    name: '智能科技有限公司',
    tags: ['五星商家', '企业', '1万保证金', '生态创新Top10']
  }
}

const fetchSellerStats = async (id: string) => {
  console.log('mock get sellerStats:', id)
  // 模拟 API 请求
  sellerStats.value = [
    { title: '评分', value: '4.9/5' },
    { title: '成交量', value: '1500+' },
    { title: '入驻时间', value: '5年' },
    { title: '服务完成率', value: '98%' }
  ]
}

const fetchRichTextContent = async (id: string) => {
  console.log('mock get sellerRichText:', id)
  // 模拟 API 请求
  const rawContent = `
    <p>智能科技有限公司是一家专注于大数据和人工智能领域的创新企业，致力于为客户提供高效的解决方案。</p>
    <img src="https://via.placeholder.com/600x400?text=About" alt="关于商家的图片" style="width:100%">
    <p>公司成立于2010年，已累计服务超过1000家企业，覆盖多个行业，包括金融、医疗、零售等。</p>
  `
  richTextContent.value = DOMPurify.sanitize(rawContent)
}

const viewSellerDetails = () => {
  router.push(`/seller/${props.sellerId}`)
}

onMounted(() => {
  fetchSellerInfo(props.sellerId)
  fetchSellerStats(props.sellerId)
  fetchRichTextContent(props.sellerId)
})
</script>

<style scoped lang="scss">
.seller-section-root-container {
  @apply flex flex-col;

  img {
    @apply w-16 h-16 rounded-full mr-4;
  }

  .stats-container {
    @apply grid grid-cols-4 gap-4 my-10;
  }

  @media (max-width: 40rem) {
    img {
      @apply hidden;
    }
    .detail-btn {
      @apply hidden;
    }
    .stats-container {
      @apply grid-cols-2;
    }
  }
}

.wrap {
  :global(.seller-body-container) {
    @apply flex flex-row items-center;

    @media (max-width: 40rem) {
      @apply cursor-pointer;
    }
  }
}
</style>
