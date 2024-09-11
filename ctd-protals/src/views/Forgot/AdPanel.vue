<template>
  <div class="forgot-ad-panel">
    <el-carousel
      :interval="5000"
      arrow="never"
      indicator-position="outside"
      height="35rem"
      autoplay
    >
      <el-carousel-item v-for="item in carouselItems" :key="item.id">
        <ad-carousel-item :title="item.title" :comment="item.comment" :img="item.img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
import AdCarouselItem from './AdCarouselItem.vue'

const carouselItems = [
  {
    id: 1,
    title: '数据交易',
    comment:
      '通过数据交易平台，企业和个人可以方便、安全地发布和获取数据，推动数据的共享与流通。这不仅有助于充分发挥数据的商业价值，还能促进各行业的数字化转型与创新发展，为社会创造更多的经济效益和价值。',
    img: 'https://via.placeholder.com/320x400'
  },
  {
    id: 2,
    title: '数据服务',
    comment:
      '通过专业技术和工具，帮助企业和机构有效地整理和优化数据，提升数据的质量和利用效率。通过数据处理服务，用户可以更准确地进行市场分析、预测业务趋势、优化决策过程，从而实现更高的运营效率和竞争优势。',
    img: 'https://via.placeholder.com/320x400'
  },
  {
    id: 3,
    title: '咨询与代办',
    comment:
      '致力于为客户提供全方位的数据相关咨询服务与委托代理业务。依托我们丰富的行业资源和专业团队快速、准确地为客户提供信息。帮助客户深入了解数据的应用场景、挖掘数据价值，助力企业保持竞争优势。',
    img: 'https://via.placeholder.com/320x400'
  },
  {
    id: 4,
    title: '需求中心',
    comment:
      '为企业和个人提供一个高效便捷的数据需求发布和对接平台。利用广泛的行业网络，为用户匹配最合适的数据供应方。确保数据需求从沟通到交付的每个环节都能高效、安全地完成。',
    img: 'https://via.placeholder.com/320x400'
  }
]
</script>
<style lang="scss" scoped>
.forgot-ad-panel {
  @apply flex flex-col justify-center w-100 mr-20 bg-gray-200 rounded-3xl p-10 sticky top-20;
  height: calc(100vh - 10rem);

  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
