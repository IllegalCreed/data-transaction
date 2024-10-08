<template>
  <div class="consult-item-panel">
    <span class="title">我们提供哪些咨询服务</span>
    <div class="grid-panel">
      <consult-item
        v-for="(service, index) in services"
        :key="index"
        :data="service"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
      </consult-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConsultItem from './ConsultServieItem.vue'

const services = [
  {
    icon: 'https://via.placeholder.com/80',
    title: '数据治理咨询',
    description: '提供全面的数据治理策略，帮助企业有效管理和利用数据资产。'
  },
  {
    icon: 'https://via.placeholder.com/80',
    title: '数据合规性审查',
    description: '确保数据处理过程符合法律法规和行业标准，保障数据安全与隐私。'
  },
  {
    icon: 'https://via.placeholder.com/80',
    title: '数据资产价值评估',
    description: '评估数据资产的商业价值，帮助企业制定数据投资策略。'
  },
  {
    icon: 'https://via.placeholder.com/80',
    title: '数据安全审计',
    description: '审查数据安全性，识别潜在风险，制定安全增强措施。'
  }
]
</script>

<style lang="scss" scoped>
.consult-item-panel {
  @apply flex flex-col items-center min-w-full bg-slate-300 py-20;

  .title {
    @apply text-4xl font-bold;
  }

  .grid-panel {
    @apply grid grid-cols-2 gap-10 mt-10 w-260;
  }

  @media (max-width: 75rem) {
    @apply px-20;

    .grid-panel {
      @apply grid-cols-1 gap-4 max-w-220 w-full;
    }
  }

  @media (max-width: 40rem) {
    @apply px-10;

    .title {
      @apply text-3xl;
    }
  }

  @media (max-width: 30rem) {
    .title {
      @apply text-2xl;
    }
  }
}
</style>
