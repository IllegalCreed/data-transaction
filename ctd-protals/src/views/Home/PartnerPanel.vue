<template>
  <div class="partner-panel-container">
    <span text-4xl font-bold self-center>合作伙伴</span>
    <top-partner mt-10 />
    <div>
      <partner-item mt-10 />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopPartner from './TopPartner.vue'
import PartnerItem from './PartnerItem.vue'
</script>

<style lang="scss" scoped>
.partner-panel-container {
  @apply flex flex-col items-stretch w-260;

  @media (max-width: 75rem) {
    @apply w-125;
  }

  @media (max-width: 40rem) {
    @apply w-full px-10;
  }
}
</style>
