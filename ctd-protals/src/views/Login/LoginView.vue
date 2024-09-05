<template>
  <div class="login-root-container">
    <control-panel />
    <div class="login-ad-panel">广告面板</div>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './ControlPanel.vue'
</script>

<style scoped lang="scss">
.login-root-container {
  @apply flex flex-row min-h-100vh min-w-100vw p-20;

  .login-ad-panel {
    @apply flex flex-col w-120 ml-20 bg-gray-200 rounded-3xl p-20;
  }

  @media (max-width: 75rem) {
    .login-ad-panel {
      @apply hidden;
    }
  }

  @media (max-width: 40rem) {
    @apply p-0;

    .login-ad-panel {
      @apply hidden;
    }
  }
}
</style>
