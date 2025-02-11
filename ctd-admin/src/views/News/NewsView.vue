<template>
  <div class="news-root-container">
    <div flex flex-row justify-between>
      <el-input
        class="search-input"
        @keyup.enter="refresh"
        @clear="refresh"
        v-model="searchQuery"
        placeholder="请输入关键字搜索"
        clearable
      >
        <template #append>
          <el-button @click="() => refresh()" :loading="getListLoading">
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>

      <el-button class="default-btn" @click="handleCreate">新建资讯</el-button>
    </div>

    <el-divider class="!my-0" />

    <news-table
      :data="data"
      :loading="getListLoading"
      :column-list="columnList"
      :propLabelMap="NEWS_PROP_LABEL_MAP"
      @delete="handleDelete"
      @changeStatus="handleChangeStatus"
    >
      <template #filter>
        <filter-sort-panel
          v-model:filter-list="filterList"
          v-model:sort-list="sortList"
          v-model:column-list="columnList"
          :propLabelMap="NEWS_PROP_LABEL_MAP"
          @reset="reset"
          @apply="refresh"
        />
      </template>
    </news-table>

    <el-pagination
      self-center
      background
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40, 50]"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'news'
})

import FilterSortPanel from '@/components/FilterSortPanel.vue'
import NewsTable from './NewsTable.vue'
import { NEWS_PROP_LABEL_MAP } from '@/constants/mapData/news'
import { useChangeNewsStatus, useDeleteNews, useSearchNews } from './composables'

// 获取列表
const getListLoading = ref<boolean>(false)

import type { INewsItem } from '@/types/news'
const data = ref<INewsItem[]>([])

import { useNewsStore } from '@/stores/modules/news'
const { getNewsList: getNewsListAction } = useNewsStore()
const getList = async (): Promise<number> => {
  getListLoading.value = true
  const res = await getNewsListAction(
    searchQuery.value,
    filterDTO.value,
    sortDTO.value,
    columnDTO.value,
    pageNum.value,
    pageSize.value
  )

  data.value = res.data.rows
  getListLoading.value = false
  return res.data.total
}

// 筛选和表格
import { useTable } from '@/composables/useTable'
import { sortList as sortDate, filterList as filterDate, columnList as columnDate } from './config'
const { sortList, filterList, columnList, filterDTO, columnDTO, sortDTO } = useTable(
  sortDate,
  filterDate,
  columnDate
)

// 分页
import { usePager } from '@/composables/usePager'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
const { handleDelete } = useDeleteNews(refresh)

// 修改状态
const { handleChangeStatus } = useChangeNewsStatus(refresh)

// 搜索
const { searchQuery, reset } = useSearchNews(refresh)

// 新建
const router = useRouter()
const handleCreate = () => {
  router.push({
    name: 'news-edit',
    params: {
      id: -1
    }
  })
}
</script>

<style scoped lang="scss">
.news-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
