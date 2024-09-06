<template>
  <div class="register-ad-panel">
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
    title: '成为产品供应商',
    comment:
      '作为产品供应商，您可以通过平台提供优质的数据产品，帮助更多企业和用户解决数据需求，充分发挥数据资源的商业价值。',
    img: 'https://via.placeholder.com/400x400?text=Product+Supplier'
  },
  {
    id: 2,
    title: '成为需求承接商',
    comment:
      '需求承接商通过承接平台上的各类数据需求，提供相应的技术或服务支持，帮助企业高效完成数据项目，获得丰厚回报。',
    img: 'https://via.placeholder.com/400x400?text=Demand'
  },
  {
    id: 3,
    title: '成为数据处理服务商',
    comment:
      '作为数据处理服务商，您可以利用先进的技术帮助企业进行数据清洗、分析、挖掘等处理服务，提升数据的使用价值和效率。',
    img: 'https://via.placeholder.com/400x400?text=Data+Provider'
  },
  {
    id: 4,
    title: '成为数据服务消费者',
    comment:
      '数据服务消费者可以通过平台获取优质的数据资源和服务，满足企业业务发展的多样化数据需求，推动数字化转型。',
    img: 'https://via.placeholder.com/400x400?text=Data+Consumer'
  }
]
</script>
<style lang="scss" scoped>
.register-ad-panel {
  @apply flex flex-col justify-center w-120 mr-20 bg-gray-200 rounded-3xl p-10;

  @media (max-width: 75rem) {
    @apply hidden;
  }
}
</style>
