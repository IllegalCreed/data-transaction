<template>
  <el-dialog
    class="search-dialog-container"
    v-model="model"
    :width="dialogWidth"
    destroy-on-close
    append-to-body
    close-on-press-escape
    :lock-scroll="false"
    @closed="resetSearch"
  >
    <div flex flex-col mt-4>
      <el-input
        v-model="searchQuery"
        size="large"
        placeholder="请输入搜索内容"
        clearable
        @input="search"
      >
        <template #prefix>
          <i :class="isLoading ? 'i-eos-icons:loading' : 'i-vaadin:search'"></i>
        </template>
      </el-input>

      <div class="record-container" v-if="!searchQuery">
        <span font-bold text-3>历史记录</span>
        <div class="list-container">
          <history-record-item
            v-for="(record, index) in historyRecords"
            :key="index"
            :module="record.module"
            :title="record.title"
            :description="record.description"
          ></history-record-item>
        </div>
      </div>
      <div class="record-container" v-else-if="searchQuery && !isLoading">
        <span font-bold text-3>搜索结果</span>
        <div class="list-container">
          <search-record-item
            v-for="(record, index) in searchResults"
            :key="index"
            :module="record.module"
            :title="record.title"
            :description="record.description"
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

const model = defineModel<boolean>({ required: true })

const searchQuery = ref('')
const isLoading = ref(false)

const handleSearch = () => {
  setTimeout(() => {
    console.log(`Searching for: ${searchQuery.value}`)
    isLoading.value = false
  }, 1000)
}

const debouncedSearch = useDebounceFn(handleSearch, 1000)

const search = () => {
  if (searchQuery.value === '') {
    isLoading.value = false
    return
  }
  isLoading.value = true
  debouncedSearch()
}

const resetSearch = () => {
  searchQuery.value = ''
  isLoading.value = false
}

const isMobileDevice = useMediaQuery('(max-width: 40rem)')

const dialogWidth = ref('30rem')
// 监听窗口大小变化
watchEffect(() => {
  if (isMobileDevice.value) {
    dialogWidth.value = '100%'
  } else {
    dialogWidth.value = '30rem'
  }
})

const historyRecords = [
  {
    module: 'data-trading' as const,
    title: '交易记录 12345',
    description: '描述了数据交易的详细信息。'
  },
  {
    module: 'data-services' as const,
    title: '服务请求 ABC',
    description: '描述了数据服务的具体内容。'
  },
  {
    module: 'asset-catalog' as const,
    title: '资产条目 67890',
    description: '这是资产目录中的一个条目。'
  }
]

const searchResults = [
  {
    module: 'data-trading' as const,
    title: '交易记录 ABC123',
    description: '描述了某个数据交易的详情。'
  },
  {
    module: 'data-services' as const,
    title: '服务记录 DEF456',
    description: '描述了某个数据服务的详情。'
  },
  {
    module: 'asset-catalog' as const,
    title: '目录项 GHI789',
    description: '这是资产目录中的一个条目。'
  },
  {
    module: 'asset-consulting' as const,
    title: '咨询记录 JKL012',
    description: '描述了某个资产咨询的详情。'
  },
  {
    module: 'community' as const,
    title: '社区活动 MNO345',
    description: '描述了社区中的一个活动记录。'
  }
]
</script>

<style lang="scss" scoped>
.wrap {
  :global(.search-dialog-container) {
    @media (max-width: 40rem) {
      @apply fixed left-0 right-0 bottom-0 mb-0 min-w-80;
    }
  }
}

.record-container {
  @apply flex flex-col min-h-100 max-h-80vh mt-4;
  .list-container {
    @apply flex flex-col flex-1 overflow-y-auto;
  }
}
</style>
