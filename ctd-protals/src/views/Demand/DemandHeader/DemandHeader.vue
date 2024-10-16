<template>
  <div class="demand-header-container" :style="{ backgroundImage: `url('${bg}')` }">
    <div class="search-panel">
      <demand-search-input></demand-search-input>

      <el-button class="create-btn" type="primary" size="large" @click="showCreateDialog = true">
        <div class="plus-icon" v-if="!isMobileDevice">
          <i-ic:baseline-plus w-6 h-6 text-white></i-ic:baseline-plus>
        </div>
        <span v-if="!isMobileDevice">发布新需求</span>
        <i-ic:baseline-plus v-else w-6 h-6></i-ic:baseline-plus>
      </el-button>
    </div>

    <filter-list-view
      class="filter-panel"
      v-model="filters"
      :source="filterSource"
      :loading="getFilterSourceActionLoading"
      :placeholderLines="4"
    ></filter-list-view>

    <create-dialog v-model="showCreateDialog" />
  </div>
</template>

<script setup lang="ts">
import DemandSearchInput from './DemandSearchInput.vue'
import FilterListView from '@/components/FilterListView.vue'
import CreateDialog from '../DemandCreate/CreateDialog.vue'
import { useDemandStore } from '@/stores/modules/demand'

const showCreateDialog = ref(false)

const bg = ref(new URL('@/assets/background/demandBackground.png', import.meta.url).href)

const demandStore = useDemandStore()
const { filters, filterSource } = storeToRefs(demandStore)
const { getFilterSource: getFilterSourceAction } = demandStore

const { isLoading: getFilterSourceActionLoading, execute: executeGetFilterSourceAction } =
  useAsyncState(getFilterSourceAction(), undefined)

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

onMounted(() => {
  try {
    executeGetFilterSourceAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
.demand-header-container {
  @apply flex flex-col items-center p-10 w-full bg-cover bg-center;

  .search-panel {
    @apply flex flex-row justify-between gap-5 max-w-300 w-full;

    :deep(.create-btn) {
      @apply flex-shrink-0 relative h-15 w-45 pl-15 rounded-full text-base text-[var(--color-primary)] bg-[var(--color-consult-icon-bg-primary)];

      .plus-icon {
        @apply absolute left-3 flex justify-center items-center h-10 w-10 bg-[var(--color-primary)] rounded-full;
      }

      @media (max-width: 40rem) {
        @apply h-10 w-10 pl-5 bg-[var(--color-primary)] text-[var(--color-text-reverse)];
      }
    }
  }

  .filter-panel {
    @apply mt-10 max-w-300 w-full;
  }

  @media (max-width: 40rem) {
    @apply p-5;

    .filter-panel {
      @apply hidden;
    }
  }
}
</style>
