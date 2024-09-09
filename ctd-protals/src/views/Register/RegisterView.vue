<template>
  <div class="register-root-container">
    <ad-panel />
    <control-panel />
  </div>
</template>
<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
import AdPanel from './AdPanel.vue'
</script>
<style lang="scss" scoped>
.register-root-container {
  @apply flex flex-row min-h-100vh min-w-full p-20;

  @media (max-width: 40rem) {
    @apply p-0;
  }
}
</style>
