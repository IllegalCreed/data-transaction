<template>
  <div ref="root" class="home-module-item-root-container">
    <div class="header">
      <img class="icon" :src="module.iconUrl" />
      <span class="title">{{ module.title }}</span>
    </div>

    <p class="desc">
      {{ module.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IModule } from '@/types/home'

defineProps<{
  module: IModule
}>()

const root = useTemplateRef('root')

const numberOfLines = 5
useWave(root, {
  numberOfLines,
  amplitude: Array.from({ length: numberOfLines }, (_, index) => 15 + index * 2),
  frequency: Array.from({ length: numberOfLines }, (_, index) => 0.01 + index * 0.005),
  opacity: Array.from({ length: numberOfLines }, (_, index) => 0 + index * 0.3),
  speed: Array.from({ length: numberOfLines }, (_, index) => 2 - index * 0.2),
  style: 'position: absolute; bottom: -20px; left: 0;',
  setCanvasSize: (canvasElement: HTMLCanvasElement) => {
    if (canvasElement) {
      const rect = root.value!.getBoundingClientRect()
      canvasElement.width = rect!.width
      canvasElement.height = 100
    }
  }
})
</script>

<style scoped lang="scss">
.home-module-item-root-container {
  @apply relative flex flex-col w-full py-10 px-10 shadow rounded overflow-hidden bg-gradient-to-b from-[var(--color-module-gradient-from)] to-[var(--color-module-gradient-to)];

  .header {
    @apply flex flex-row items-center gap-8;

    .title {
      @apply text-4xl font-bold tracking-widest font-sans;
    }

    .icon {
      @apply w-25 h-25 object-contain;
    }
  }

  .desc {
    @apply text-base leading-loose text-[var(--color-text-light)] line-clamp-5;
  }

  @media (max-width: 60rem) {
    @apply py-10 px-8;

    .header {
      @apply gap-4;

      .title {
        @apply text-3xl;
      }

      .icon {
        @apply w-18 h-18;
      }
    }

    .desc {
      @apply line-clamp-6;
    }
  }

  @media (max-width: 50rem) {
    @apply py-8 px-6;

    .header {
      .title {
        @apply text-2xl;
      }
      .icon {
        @apply w-10 h-10;
      }
    }

    .desc {
      @apply text-sm leading-loose line-clamp-7;
    }
  }

  @media (max-width: 40rem) {
    @apply py-10 px-10;
    .header {
      @apply gap-8;

      .title {
        @apply text-4xl;
      }

      .icon {
        @apply w-20 h-20;
      }
    }

    .desc {
      @apply text-base leading-loose line-clamp-5;
    }
  }

  @media (max-width: 30rem) {
    @apply py-10 px-8;
    .header {
      @apply gap-4;

      .title {
        @apply text-3xl;
      }

      .icon {
        @apply w-14 h-14;
      }
    }

    .desc {
      @apply text-sm leading-loose line-clamp-7;
    }
  }

  @media (max-width: 23rem) {
    @apply py-8 px-6;
    .header {
      .title {
        @apply text-2xl;
      }

      .icon {
        @apply w-12 h-12;
      }
    }

    .desc {
      @apply text-sx leading-loose line-clamp-7;
    }
  }
}
</style>
