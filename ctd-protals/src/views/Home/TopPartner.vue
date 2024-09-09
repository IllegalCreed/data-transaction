<template>
  <div class="top-partner-container">
    <div class="partner-item" data-aos="fade-up">
      <img :src="partner[0].img" />
      <div flex flex-col>
        <span class="title">{{ partner[0].name }}</span>
        <span class="desc">{{ partner[0].description }}</span>
      </div>
    </div>
    <div class="partner-item" data-aos="fade-up" data-aos-delay="100">
      <img :src="partner[1].img" />
      <div flex flex-col>
        <span class="title">{{ partner[1].name }}</span>
        <span class="desc">{{ partner[1].description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const partner = [
  {
    img: 'https://via.placeholder.com/200x100?text=Partner+Logo+1',
    name: 'XXXX有限公司',
    description: 'XXXX是一家全球领先的ICT（信息与通信）基础设施和智能终端提供商'
  },
  {
    img: 'https://via.placeholder.com/200x100?text=Partner+Logo+2',
    name: 'XXXX集团',
    description: 'XXXX集团是一家中国跨国科技公司，专注于电子商务、零售、互联网技术'
  }
]
</script>

<style lang="scss" scoped>
.top-partner-container {
  @apply flex flex-row justify-between;

  .partner-item {
    @apply flex flex-row items-center space-x-6 w-125 bg-gray-100 p-4;

    .title {
      @apply text-2xl font-bold;
    }

    .desc {
      @apply text-sm text-gray-400 mt-4;
    }

    @media (max-width: 40rem) {
      @apply flex flex-col w-full space-x-0 space-y-6;

      .title {
        @apply self-center;
      }
    }
  }

  @media (max-width: 75rem) {
    @apply flex-col space-y-10 items-center;
  }
}
</style>
