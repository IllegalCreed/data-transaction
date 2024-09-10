<template>
  <div flex flex-col items-center mt-20>
    <span class="title" data-aos="fade-up">我们的明星咨询团队</span>
    <div class="grid-panel">
      <consult-team-item
        v-for="(company, index) in companies"
        :key="index"
        :data="company"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
      </consult-team-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConsultTeamItem from './ConsultTeamItem.vue'

const companies = [
  {
    logo: 'https://via.placeholder.com/240x240',
    name: '数据治理专家有限公司',
    description: '专注于提供数据治理、数据管理解决方案的专业公司。'
  },
  {
    logo: 'https://via.placeholder.com/240x240',
    name: '合规性审查咨询有限公司',
    description: '为客户提供全面的数据合规性审查服务，确保符合最新法规要求。'
  },
  {
    logo: 'https://via.placeholder.com/240x240',
    name: '资产价值评估有限公司',
    description: '专门从事数据资产评估，帮助企业量化数据的商业价值。'
  },
  {
    logo: 'https://via.placeholder.com/240x240',
    name: '安全审计风险管理有限公司',
    description: '提供全方位的数据安全审计和风险管理服务，保障企业的数据安全。'
  }
]
</script>

<style lang="scss" scoped>
.title {
  @apply text-4xl font-bold;

  @media (max-width: 40rem) {
    @apply text-3xl;
  }

  @media (max-width: 30rem) {
    @apply text-2xl;
  }
}

.grid-panel {
  @apply grid grid-cols-4 gap-10 mt-10 max-w-260;

  @media (max-width: 75rem) {
    @apply grid-cols-2 px-20 w-full;
  }

  @media (max-width: 40rem) {
    @apply grid-cols-1 px-10;
  }
}
</style>
