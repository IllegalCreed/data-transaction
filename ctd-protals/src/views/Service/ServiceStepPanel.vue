<template>
  <div class="step-panel-container">
    <service-step-item
      v-for="(step, index) in steps"
      :key="index"
      data-aos="fade-up"
      :data-aos-delay="index * 100"
      :stepNumber="step.stepNumber"
      :title="step.title"
      :description="step.description"
    ></service-step-item>
  </div>
</template>

<script setup lang="ts">
import ServiceStepItem from './ServiceStepItem.vue'

const steps = [
  {
    stepNumber: '01',
    title: '需求分析',
    description: '了解您的数据处理需求，进行初步咨询和沟通，评估项目的范围和复杂性。'
  },
  {
    stepNumber: '02',
    title: '方案设计',
    description: '根据您的需求定制数据处理方案，包括所需的技术、工具、时间框架和成本估算。'
  },
  {
    stepNumber: '03',
    title: '数据处理',
    description: '实施数据处理服务，确保数据质量达到您的要求，并符合标准。'
  },
  {
    stepNumber: '04',
    title: '结果交付与支持',
    description: '将处理后的数据和报告交付给您，提供后续支持和优化建议，确保您的满意度。'
  }
]
</script>

<style lang="scss" scoped>
.step-panel-container {
  @apply grid grid-cols-4 gap-6;

  @media (max-width: 75rem) {
    @apply grid-cols-2;
  }

  @media (max-width: 40rem) {
    @apply grid-cols-1;
  }
}
</style>
