<template>
  <div class="consult-root-container">
    <consult-banner></consult-banner>

    <indicator-panel mt-20></indicator-panel>

    <consult-item-panel mt-20></consult-item-panel>

    <consult-team-panel mt-20></consult-team-panel>
  </div>
</template>

<script setup lang="ts">
import ConsultBanner from './ConsultBanner.vue'
import IndicatorPanel from './Indicator/IndicatorPanel.vue'
import ConsultItemPanel from './Service/ConsultServicePanel.vue'
import ConsultTeamPanel from './Team/ConsultTeamPanel.vue'
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
