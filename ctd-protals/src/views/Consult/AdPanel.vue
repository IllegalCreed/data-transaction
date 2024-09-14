<template>
  <div class="consult-ad-panel">
    <img
      src="https://via.placeholder.com/400x600"
      rounded-3xl
      h-150
      w-100
      object-cover
      data-aos="fade-up"
    />
    <div class="text-container">
      <span class="title" data-aos="fade-up">为什么选择我们</span>
      <p text-base text-gray-400 data-aos="fade-up">
        我们的咨询服务致力于帮助企业实现数据驱动决策，提升数据治理水平，确保数据合规性，并最大化数据资产的商业价值。
      </p>
      <div flex-1></div>
      <div class="ad-grid" data-aos="fade-up">
        <el-card
          v-for="(metric, index) in metrics"
          :key="index"
          body-class="quota-item-body-container"
          shadow="hover"
        >
          <span text-2xl font-bold text-center>{{ metric.title }}</span>
          <span text-orange-500 font-bold text-5xl my-5>{{ metric.value }}</span>
          <span text-sm text-center text-gray-400>{{ metric.description }}</span>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  {
    title: '数据质量提升',
    value: '30%',
    description: '通过我们的数据治理和清洗服务，数据质量提升了30%以上。'
  },
  {
    title: '合规性合格率',
    value: '95%',
    description: '我们帮助客户的数据合规性审查通过率达到了95%以上。'
  },
  {
    title: '数据利用率',
    value: '40%',
    description: '优化的数据管理策略让数据利用率提高了40%。'
  },
  {
    title: '资产价值评估',
    value: '20%',
    description: '数据资产的商业价值评估增长了20%，助力企业战略决策。'
  }
]
</script>

<style lang="scss" scoped>
.wrap {
  :global(.quota-item-body-container) {
    @apply flex flex-col h-full items-center bg-gray-100;
  }
}

.consult-ad-panel {
  @apply flex flex-row w-260;

  @media (max-width: 75rem) {
    @apply justify-center w-full px-20;

    img {
      @apply hidden;
    }
  }

  @media (max-width: 40rem) {
    @apply px-10;
  }
}

.text-container {
  @apply flex flex-col ml-20;

  .title {
    @apply text-4xl font-bold;
  }

  @media (max-width: 75rem) {
    @apply items-center ml-0;
  }

  @media (max-width: 40rem) {
    .title {
      @apply text-3xl;
    }
  }
}

.ad-grid {
  @apply grid grid-cols-2 gap-6 w-full;

  @media (max-width: 75rem) {
    @apply mt-10;
  }

  @media (max-width: 40rem) {
    @apply grid-cols-1;
  }
}
</style>
