<template>
  <div class="scene-root-container">
    <scene-banner></scene-banner>

    <!-- <scene-primary-panel mt-20></scene-primary-panel> -->

    <scene-panel mt-20></scene-panel>

    <scene-solicit-panel mt-20></scene-solicit-panel>
  </div>
</template>

<script setup lang="ts">
import SceneBanner from './SceneBanner.vue'
// import ScenePrimaryPanel from './ScnenPrimary/ScenePrimaryPanel.vue'
import SceneSolicitPanel from './SceneSolicitPanel.vue'
import ScenePanel from './SceneCase/SceneCasePanel.vue'
</script>

<style scoped lang="scss">
.scene-root-container {
  @apply flex flex-col items-center;
}
</style>
