<template>
  <el-dialog
    class="search-dialog-container"
    title="全局搜索"
    v-model="model"
    :width="dialogWidth"
    destroy-on-close
    append-to-body
    close-on-press-escape
    :lock-scroll="false"
    @closed="resetSearch"
  >
    <div flex flex-col>
      <el-input
        v-model="searchQuery"
        size="large"
        placeholder="请输入搜索内容"
        clearable
        @input="search"
      >
        <template #prefix>
          <i
            :class="
              getSearchResultsActionLoading || getHistoryRecordsActionLoading
                ? 'i-eos-icons:loading'
                : 'i-vaadin:search'
            "
          ></i>
        </template>
      </el-input>

      <div class="record-container" v-if="!searchQuery">
        <span font-bold text-sm>历史记录</span>
        <div class="list-container">
          <history-record-item
            v-for="(item, index) in historyRecords"
            :key="index"
            :data="item"
          ></history-record-item>
        </div>
      </div>
      <div
        class="record-container"
        v-else-if="searchQuery && !getSearchResultsActionLoading"
      >
        <span font-bold text-sm>搜索结果</span>
        <div class="list-container">
          <search-record-item
            v-for="(item, index) in searchResults"
            :key="index"
            :data="item"
          />
        </div>
      </div>
      <div v-else min-h-100 mt-4></div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import HistoryRecordItem from './HistoryRecordItem.vue'
import SearchRecordItem from './SearchRecordItem.vue'
import { useMasterStore } from '@/stores/modules/master'
const masterStore = useMasterStore()
const { historyRecords, searchResults } = storeToRefs(masterStore)
const {
  getHistoryRecords: getHistoryRecordsAction,
  getSearchResults: getSearchResultsAction,
} = masterStore

const model = defineModel<boolean>({ required: true })

const searchQuery = ref('')
const getSearchResultsActionLoading = ref(false)

const executeGetSearchResultsAction = useDebounceFn(
  () =>
    getSearchResultsAction(searchQuery.value).then(() => {
      getSearchResultsActionLoading.value = false
    }),
  1000,
)

const search = () => {
  if (searchQuery.value === '') {
    getSearchResultsActionLoading.value = false
    return
  }
  getSearchResultsActionLoading.value = true
  executeGetSearchResultsAction()
}

const resetSearch = () => {
  searchQuery.value = ''
  getSearchResultsActionLoading.value = false
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const dialogWidth = ref('40rem')
watchEffect(() => {
  if (isMobileDevice.value) {
    dialogWidth.value = '100%'
  } else {
    dialogWidth.value = '40rem'
  }
})

const {
  isLoading: getHistoryRecordsActionLoading,
  execute: executeGetHistoryRecordsAction,
} = useAsyncState(() => getHistoryRecordsAction(), undefined)

onMounted(() => {
  try {
    executeGetHistoryRecordsAction()
  } catch (error: unknown) {
    console.error(error)
  }
})
</script>

<style lang="scss" scoped>
:global(.search-dialog-container) {
  @media (max-width: 40rem) {
    @apply fixed left-0 right-0 bottom-0 mb-0 min-w-80;
  }
}

.record-container {
  @apply flex flex-col min-h-100 max-h-60vh mt-4;
  .list-container {
    @apply flex flex-col flex-1 overflow-y-auto;
  }
}
</style>
