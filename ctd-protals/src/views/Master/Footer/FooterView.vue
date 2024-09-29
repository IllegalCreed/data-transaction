<template>
  <div class="footer-root-container">
    <div class="footer-link-container">
      <div class="responsive-container">
        <link-panel />
        <about-panel />
        <contact-panel />
      </div>
    </div>
    <record-panel />
  </div>
</template>

<script setup lang="ts">
import LinkPanel from './LinkPanel.vue'
import AboutPanel from './AboutPanel.vue'
import ContactPanel from './ContactPanel.vue'
import RecordPanel from './RecordPanel.vue'
</script>

<style scoped lang="scss">
.footer-root-container {
  @apply flex flex-col mt-20;

  .footer-link-container {
    @apply flex justify-center items-center min-w-full bg-[var(--color-background-light)] py-10;
  }

  .responsive-container {
    @apply grid grid-cols-4 gap-10 max-w-320 w-full px-10;
  }

  @media (max-width: 60rem) {
    .responsive-container {
      @apply grid-cols-2;
    }
  }

  @media (max-width: 40rem) {
    .responsive-container {
      @apply px-5 gap-5;
    }
  }
}
</style>
