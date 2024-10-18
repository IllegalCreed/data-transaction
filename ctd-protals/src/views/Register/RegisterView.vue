<template>
  <div class="register-root-container">
    <ad-panel z-10 />
    <control-panel z-10 />
  </div>
</template>
<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
import AdPanel from './AdPanel.vue'
</script>
<style lang="scss" scoped>
.register-root-container {
  @apply flex flex-row min-h-100vh min-w-full;

  #tsparticles {
    @apply z-0;
  }
}
</style>
