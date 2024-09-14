<template>
  <div class="login-ad-panel">
    <span text-4xl leading-relaxed font-bold mt-10 whitespace-pre-line>{{
      '北京市\n文旅数据平台'
    }}</span>
    <p text-lg text-gray-400 mt-10 line-height-loose>
      致力于整合和共享全市文化和旅游数据资源，提升信息化服务水平。平台通过数据交易、处理服务和需求发布等功能，为企业和公众提供便捷、安全的数字化解决方案，助力北京市文旅产业的数字化转型与高质量发展。
    </p>
    <div flex-1></div>
    <el-carousel
      :interval="5000"
      arrow="never"
      indicator-position="outside"
      height="12rem"
      autoplay
    >
      <el-carousel-item v-for="item in carouselItems" :key="item.id">
        <ad-carousel-item
          :title="item.title"
          :comment="item.comment"
          :avatar="item.avatar"
          :name="item.name"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
import AdCarouselItem from './AdCarouselItem.vue'

// 测试数据
const carouselItems = [
  {
    id: 1,
    title: '数据交易功能',
    name: '张三',
    comment:
      '自从使用了这个平台的“数据交易”功能，我们公司大大提高了数据共享和流通的效率，节省了不少时间和成本。平台界面友好，操作简单，让我们能够快速上手。非常推荐其他公司也使用这个功能！',
    avatar: 'https://via.placeholder.com/50'
  },
  {
    id: 2,
    title: '数据处理服务',
    name: '李四',
    comment:
      '平台提供的“数据处理服务”真的很棒！我们原本有一批杂乱无章的数据，在平台上进行处理后，数据变得整洁且高效。这项服务帮助我们更准确地预测市场趋势，优化了公司的决策过程。',
    avatar: 'https://via.placeholder.com/50'
  },
  {
    id: 3,
    title: '咨询与代办服务',
    name: '王五',
    comment:
      '我对平台提供的“咨询与代办服务”非常满意！工作人员专业且细心，他们的建议帮助我们公司顺利通过了数据合规审核。整个过程高效且透明，我觉得这是我们合作过的最好的一次体验。',
    avatar: 'https://via.placeholder.com/50'
  },
  {
    id: 4,
    title: '需求中心',
    name: '赵六',
    comment:
      '使用平台的“需求中心”发布数据需求后，没想到很快就得到了响应，并匹配到了合适的供应商。整个沟通过程非常顺畅。总的来说，这是一个非常值得信赖的平台。',
    avatar: 'https://via.placeholder.com/50'
  }
]
</script>
<style lang="scss" scoped>
.login-ad-panel {
  @apply flex flex-col w-120 ml-20 bg-gray-200 rounded-3xl p-10;

  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
