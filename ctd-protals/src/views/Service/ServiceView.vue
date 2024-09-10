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
    <span text-center mt-4 mb-10 mx-10 text-gray-500
      >以下是我们为您提供的数据处理服务的完整流程，确保每一步都精准有效。</span
    >

    <service-step-panel></service-step-panel>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores/modules/service'
import ServiceItem from './ServiceItem.vue'
import ServiceStepPanel from './ServiceStepPanel.vue'

const { services } = useServiceStore()
</script>

<style scoped lang="scss"></style>
