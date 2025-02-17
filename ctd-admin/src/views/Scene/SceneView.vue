<template>
  <div class="scene-root-container">
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

      <el-button class="default-btn" @click="handleCreate">新建场景</el-button>
    </div>

    <el-divider class="!my-0" />

    <scene-table
      :data="data"
      :loading="getListLoading"
      :column-list="columnList"
      :propLabelMap="SCENE_PROP_LABEL_MAP"
      @delete="handleDelete"
      @changeStatus="handleChangeStatus"
    >
      <template #filter>
        <filter-sort-panel
          v-model:filter-list="filterList"
          v-model:sort-list="sortList"
          v-model:column-list="columnList"
          :propLabelMap="SCENE_PROP_LABEL_MAP"
          @reset="reset"
          @apply="refresh"
        />
      </template>
    </scene-table>

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
  name: 'scene'
})

import FilterSortPanel from '@/components/FilterSortPanel.vue'
import SceneTable from './SceneTable.vue'
import { SCENE_PROP_LABEL_MAP } from '@/constants/mapData/scene'
import { useChangeScenesStatus, useDeleteScenes, useSearchScene } from './composables'

// 获取列表
const getListLoading = ref<boolean>(false)

import type { ISceneItem } from '@/types/scene'
const data = ref<ISceneItem[]>([])

import { useSceneStore } from '@/stores/modules/scene'
const { getScenes: getScenesAction } = useSceneStore()

const getList = async (): Promise<number> => {
  getListLoading.value = true
  const res = await getScenesAction(
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
const { handleDelete } = useDeleteScenes(refresh)

// 修改状态
const { handleChangeStatus } = useChangeScenesStatus(refresh)

// 搜索
const { searchQuery, reset } = useSearchScene(refresh)

// 新建
const router = useRouter()
const handleCreate = () => {
  router.push({
    name: 'scene-edit',
    params: {
      id: -1
    }
  })
}
</script>

<style scoped lang="scss">
.scene-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
