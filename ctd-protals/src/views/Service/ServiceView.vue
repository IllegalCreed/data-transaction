<template>
  <div class="service-root-container">
    <service-banner></service-banner>

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
    <span text-center mt-4 mb-10 mx-10 text-gray-500
      >以下是我们为您提供的数据处理服务的完整流程，确保每一步都精准有效。</span
    >

    <service-step-panel></service-step-panel>
  </div>
</template>

<script setup lang="ts">
import ServiceBanner from './ServiceBanner.vue'
import ServiceItem from './ServiceItem.vue'
import ServiceStepPanel from './ServiceStepPanel.vue'

import { useServiceStore } from '@/stores/modules/service'

const { services } = useServiceStore()
</script>

<style scoped lang="scss">
.service-root-container {
  @apply flex flex-col items-center;
}
</style>
