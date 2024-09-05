<template>
  <div class="login-root-container">
    <control-panel />
    <ad-panel />
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
import AdPanel from './AdPanel.vue'
</script>

<style scoped lang="scss">
.login-root-container {
  @apply flex flex-row min-h-100vh min-w-100vw p-20;

  @media (max-width: 40rem) {
    @apply p-0;
  }
}
</style>
