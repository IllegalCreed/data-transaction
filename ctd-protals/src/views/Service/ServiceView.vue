<template>
  <div class="service-root-container">
    <service-banner></service-banner>

    <service-step-panel mb-20></service-step-panel>

    <service-panel></service-panel>
  </div>
</template>

<script setup lang="ts">
import ServiceBanner from './ServiceBanner.vue'
import ServicePanel from './service/ServicePanel.vue'
import ServiceStepPanel from './flow/ServiceStepPanel.vue'
</script>

<style scoped lang="scss">
.service-root-container {
  @apply flex flex-col items-center;
}
</style>
