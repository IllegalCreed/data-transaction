<template>
  <div class="scene-root-container">
    <div class="banner">应用场景宣传图</div>

    <scene-primary-panel mt-20></scene-primary-panel>

    <scene-solicit-panel mt-20></scene-solicit-panel>

    <scene-panel mt-20></scene-panel>
  </div>
</template>

<script setup lang="ts">
import ScenePrimaryPanel from './ScenePrimaryPanel.vue'
import SceneSolicitPanel from './SceneSolicitPanel.vue'
import ScenePanel from './ScenePanel.vue'
</script>

<style scoped lang="scss">
.scene-root-container {
  @apply flex flex-col items-center;

  .banner {
    @apply flex justify-center items-center min-w-full bg-blueGray min-h-100 text-8;
  }

  @media (max-width: 40rem) {
    .banner {
      @apply hidden;
    }
  }
}
</style>
