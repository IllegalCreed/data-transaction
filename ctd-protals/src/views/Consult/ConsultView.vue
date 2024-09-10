<template>
  <div class="consult-root-container">
    <div class="banner">咨询服务宣传图</div>

    <ad-panel mt-20></ad-panel>

    <consult-item-panel mt-20></consult-item-panel>

    <consult-team-panel mt-20></consult-team-panel>
  </div>
</template>

<script setup lang="ts">
import AdPanel from './AdPanel.vue'
import ConsultItemPanel from './ConsultItemPanel.vue'
import ConsultTeamPanel from './ConsultTeamPanel.vue'
</script>

<style scoped lang="scss">
.consult-root-container {
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
