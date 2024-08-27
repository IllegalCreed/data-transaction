<template>
  <div flex flex-col items-center>
    <div flex justify-center items-center min-w-full bg-blueGray min-h-100 text-8>
      数据处理宣传图
    </div>

    <service-item
      v-for="service in services"
      :key="service.id"
      :title="service.title"
      :description="service.description"
      :sellingPoints="service.sellingPoints"
      :imageUrl="service.imageUrl"
      :showBackground="service.showBackground"
      :imagePosition="service.imagePosition"
    ></service-item>

    <span mt-20 text-4xl>服务流程</span>
    <span w-260 text-center mt-4 mb-20 text-gray-500
      >以下是我们为您提供的数据处理服务的完整流程，确保每一步都精准有效。</span
    >
    <div flex flex-row items-center data-aos="fade-up">
      <service-step-item
        stepNumber="第一步"
        title="需求分析"
        description="了解您的数据处理需求，进行初步咨询和沟通，评估项目的范围和复杂性。"
      ></service-step-item>
      <i-fluent:arrow-turn-right-down-20-regular
        ml-10
        h-40
        w-40
        text-gray
      ></i-fluent:arrow-turn-right-down-20-regular>
    </div>

    <div flex flex-row items-center data-aos="fade-up">
      <i-fluent:arrow-turn-left-down-20-regular
        mr-10
        h-40
        w-40
        text-gray
      ></i-fluent:arrow-turn-left-down-20-regular>
      <service-step-item
        stepNumber="第二步"
        title="方案设计"
        description="根据您的需求定制数据处理方案，包括所需的技术、工具、时间框架和成本估算。"
      ></service-step-item>
    </div>

    <div flex flex-row items-center data-aos="fade-up">
      <service-step-item
        stepNumber="第三步"
        title="数据处理"
        description="实施数据处理服务，确保数据质量达到您的要求，并符合标准。"
      ></service-step-item>
      <i-fluent:arrow-turn-right-down-20-regular
        ml-10
        h-40
        w-40
        text-gray
      ></i-fluent:arrow-turn-right-down-20-regular>
    </div>

    <div flex flex-row items-center data-aos="fade-up">
      <service-step-item
        ml-50
        stepNumber="第四步"
        title="结果交付与支持"
        description="将处理后的数据和报告交付给您，提供后续支持和优化建议，确保您的满意度。"
      ></service-step-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores/modules/service'
import ServiceItem from './ServiceItem.vue'
import ServiceStepItem from './ServiceStepItem.vue'

const { services } = useServiceStore()
</script>

<style scoped lang="scss"></style>
