<template>
  <el-card
    :shadow="cardShadow"
    class="demand-item-root-container"
    body-class="demand-item-body-container"
    @click="goToDemandDetail"
  >
    <div class="text-container">
      <span class="title" font-bold text-lg>{{ demand.name }}</span>
      <div class="tag-container">
        <el-tag v-for="(tag, index) in demand.tags" :key="index" type="danger" size="small">
          {{ tag }}
        </el-tag>
      </div>
      <span class="desc">{{ demand.description }}</span>
      <div flex-1></div>
      <div flex flex-row justify-between items-center mt-4 mb-10>
        <span text-sm text-gray-500>{{ demand.createTime }}</span>
        <span font-bold text-red-600 self-end>￥{{ demand.budget }}</span>
      </div>
    </div>
    <div
      absolute
      flex
      flex-row
      items-center
      justify-between
      px-4
      left-0
      bottom-0
      right-0
      h-10
      bg-blueGray
    >
      <el-tag type="success">{{ demand.status }}</el-tag>
      <span font-bold text-base text-white>{{ demand.transactionMode.type }}</span>
    </div>
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts">
import type { IDemand } from '@/types/demand'
import { useRouter } from 'vue-router'

const props = defineProps<{
  demand: IDemand
}>()

const router = useRouter()

const goToDemandDetail = () => {
  router.push(`/demand/${props.demand.id}`)
}

const cardShadow = ref<'always' | 'never' | 'hover'>('hover')
const isMobileDevice = useMediaQuery('(max-width: 40rem)')

watchEffect(() => {
  if (isMobileDevice.value) {
    cardShadow.value = 'never'
  } else {
    cardShadow.value = 'hover'
  }
})
</script>

<style scoped lang="scss">
.demand-item-root-container {
  @apply mb-5 mx-2 w-82 cursor-pointer relative;

  .text-container {
    @apply flex flex-col flex-1;

    .title {
      @apply font-bold text-lg mr-10 line-clamp-1;
    }

    .tag-container {
      @apply flex flex-row flex-wrap gap-2 mt-2;
    }

    .desc {
      @apply mt-6 text-sm text-gray-700 line-clamp-2 text-ellipsis;
    }

    .company {
      @apply mt-2 text-sm text-gray-400 line-clamp-1 text-ellipsis;
    }
  }

  @media (max-width: 40rem) {
    @apply w-[calc(50%-20px)] mx-1 mb-2;

    .text-container {
      .desc {
        @apply text-sm mt-2;
      }

      .company {
        @apply text-sm;
      }
    }
  }

  @media (max-width: 30rem) {
    @apply w-[calc(100%-20px)] mx-1 mb-2;

    .text-container {
      .title {
        @apply font-bold text-base mt-0;
      }

      .tag-container {
        @apply gap-1 mt-1;
      }

      .desc {
        @apply text-xs mt-2;
      }

      .company {
        @apply text-xs;
      }
    }
  }
}

.wrap {
  :global(.demand-item-body-container) {
    @apply flex flex-col h-full relative;

    @media (max-width: 40rem) {
      @apply p-3;
    }

    @media (max-width: 30rem) {
      @apply p-2;
    }
  }
}
</style>
