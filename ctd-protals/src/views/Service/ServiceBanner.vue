<template>
  <div class="service-banner-root-container">
    <div class="inner-container">
      <div flex flex-col items-start>
        <span class="title">数据服务</span>
        <span class="desc">
          为了满足企业的需求，我们提供了一系列数据处理服务，包括数据清洗、数据集成、数据建模、数据可视化等。
          我们的团队拥有丰富的经验和技术能力，能够帮助企业实现数据驱动的决策和业务增长。
        </span>
      </div>
      <img />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.service-banner-root-container {
  @apply flex flex-col items-center justify-center w-full h-120 bg-gradient-to-r from-[var(--color-background-primary-darker)] to-[var(--color-background-primary-lighter)];

  .inner-container {
    @apply flex flex-row items-center w-full max-w-320 px-10;

    .title {
      @apply relative text-5xl font-bold text-[var(--color-text-reverse)];

      &::before {
        @apply content-[''] absolute bottom--5 left-1/2 translate-x--1/2 w-full h-1 rounded bg-[var(--color-text-reverse)];
      }
    }

    .desc {
      @apply mt-10 text-lg text-[var(--color-text-reverse)];
    }
  }

  @media (max-width: 75rem) {
    @apply h-auto aspect-[5/2];
  }
}
</style>
