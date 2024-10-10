<template>
  <div>
    <div v-html="productDetails" overflow-hidden></div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const props = defineProps<{
  productId: string
}>()

const productDetails = ref<string | null>(null)

const fetchProductDetails = async (id: string) => {
  // console.log('mock get productDetails for productId:', id)
  const rawContent = `
  <h3>数据产品介绍</h3>
  <p>我们的最新数据产品 <strong>“智能城市数据包”</strong> 提供了广泛的城市数据，包括交通、天气、人口统计等，适用于各类智能城市项目。</p>

  <h4>产品特点</h4>
  <ul>
    <li>涵盖多种城市数据：交通、天气、人口统计等。</li>
    <li>实时数据更新，确保信息的准确性和时效性。</li>
    <li>易于集成，支持多种开发平台和工具。</li>
  </ul>

  <h4>应用场景</h4>
  <p>该数据包可用于多个场景，如智能交通管理、城市规划、环境监测等。以下是一个示意图：</p>
  <img src="https://via.placeholder.com/800x400" alt="智能城市数据图" style="width:100%"/>

  <h4>产品示例</h4>
  <p>下面的视频展示了如何使用该数据包创建智能交通管理系统：</p>
  <video controls width="100%">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    您的浏览器不支持视频标签。
  </video>

  <h4>潜在危险内容</h4>
  <p>以下内容是注入的潜在危险内容，用于测试过滤效果：</p>
  <img src="invalid.jpg" onerror="alert('XSS Attack!')" />

  <h4>客户评价</h4>
  <blockquote>
    <p>"这个数据包帮助我们显著提升了交通管理的效率，使得整个城市的通行情况得到了极大的改善。" - 城市交通管理局</p>
  </blockquote>

  <p>更多详情，请访问我们的官方网站。</p>
  <a href="https://example.com" target="_blank">点击这里了解更多</a>
`
  productDetails.value = DOMPurify.sanitize(rawContent)
}

onMounted(() => {
  fetchProductDetails(props.productId)
})
</script>

<style lang="scss" scoped>
/* 特定样式 */
</style>
