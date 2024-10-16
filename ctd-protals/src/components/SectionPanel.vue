<template>
  <div class="section-panel-root-container">
    <section v-for="section in sections" :id="section.id" :key="section.id">
      <span>{{ section.label }}</span>
      <component :is="section.component" v-bind="section.props" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ISection } from '@/types/section'

defineProps<{ sections: ISection[] }>()
</script>

<style lang="scss" scoped>
.section-panel-root-container {
  @apply flex flex-col gap-10;

  section > span {
    @apply block relative h-10 text-5 leading-10 font-bold text-dark mb-4 pl-4 bg-[var(--color-detail-section-background)] rounded-r;

    &::before {
      @apply absolute bg-[var(--color-primary)] h-10 top-0 left-0 w-1 content-[''];
    }
  }
}
</style>
