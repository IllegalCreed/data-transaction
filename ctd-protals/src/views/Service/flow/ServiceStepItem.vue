<template>
  <div class="service-step-item-root-container">
    <div class="step-label">
      {{ step.stepNumber }}
    </div>
    <div class="step-item-body-container">
      <span class="title">{{ step.title }}</span>
      <p class="desc">
        {{ step.description }}
      </p>
      <div flex-1></div>

      <i :class="step.icon" class="icon"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IStep } from '@/types/service'

defineProps<{ step: IStep }>()
</script>

<style scoped lang="scss">
.service-step-item-root-container {
  @apply flex flex-col items-center max-w-70;

  .step-label {
    @apply flex justify-center items-center w-25 h-25 rounded-full bg-[var(--color-background-alternating)] text-[var(--color-primary)] font-bold text-4xl z-10 shadow-lg;
    --un-shadow-color: var(--color-shadow-primary-lightest);
  }

  .step-item-body-container {
    @apply flex flex-col items-center justify-stretch mt--12 w-full h-120 px-10 pt-20 pb-15 bg-[var(--color-background-alternating)];

    .title {
      @apply relative font-bold text-2xl;

      &::before {
        @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-20 h-1 rounded bg-[var(--color-primary)];
      }
    }

    .desc {
      @apply text-base mt-10 line-clamp-4 leading-loose;
    }

    .icon {
      @apply w-25 h-25 text-[var(--color-step-icon-primary)];
    }
  }

  @media (max-width: 40rem) {
    .step-label {
      @apply w-20 h-20 text-3xl;
    }

    .step-item-body-container {
      @apply mt--10 px-5 pt-15 pb-10 h-90;

      .title {
        @apply text-xl;
      }

      .desc {
        @apply text-sm line-clamp-4 leading-loose;
      }

      .icon {
        @apply w-20 h-20;
      }
    }
  }
}
</style>
