<template>
  <div class="phase-flow-root-container">
    <div class="step-wrapper" v-for="(item, index) in steps" :key="item.id">
      <div class="step-container">
        <div class="step-icon">
          <img :src="item.imageUrl" alt="icon" />
          <div class="step-index">{{ index + 1 }}</div>
        </div>
        <div class="step-title">{{ item.title }}</div>
      </div>
      <div v-if="index < steps.length - 1" class="connector"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISafe } from '@/types/safe'

defineProps<{ steps: ISafe[] }>()
</script>

<style lang="scss" scoped>
.phase-flow-root-container {
  @apply flex flex-row flex-wrap items-center;

  .step-wrapper {
    @apply flex flex-row items-start;

    .step-container {
      @apply flex flex-col items-center w-20;

      .step-icon {
        @apply relative w-15 h-15 flex items-center justify-center;

        img {
          @apply w-15 h-15 object-contain;
        }

        .step-index {
          @apply absolute bottom--2.5 left-1/2 translate-x--1/2 w-5 h-5 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-xs text-[var(--color-text-reverse)];
        }
      }

      .step-title {
        @apply text-sm mt-5;
      }
    }

    .connector {
      @apply w-12 h-1px bg-[var(--color-primary)] relative mt-8;

      &::after {
        @apply content-[''] absolute top--1 left-1/2 translate-x--1/2;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid var(--color-primary);
      }
    }
  }
}
</style>
