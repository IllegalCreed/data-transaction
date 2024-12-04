<template>
  <div class="scene-root-container">
    <div flex flex-row justify-between>
      <el-input
        class="search-input"
        @keyup.enter="handleSearch"
        @clear="handleSearch"
        v-model="searchQuery"
        placeholder="请输入关键字搜索"
        clearable
      >
        <template #append>
          <el-button @click="handleSearch" :loading="getListLoading">
            <template v-slot:icon>
              <i-vaadin:search></i-vaadin:search>
            </template>
          </el-button>
        </template>
      </el-input>

      <el-button class="default-btn" @click="handleCreate">新建场景</el-button>
    </div>

    <el-divider class="!my-0" />

    <scene-filter-sort-panel
      v-model:status="status"
      v-model:is-outer-link="isOuterLink"
      @refresh="reset"
    />

    <scene-tabel-panel
      :data="data"
      :loading="getListLoading"
      @delete="handleDelete"
      @changeStatus="handleChangeStatus"
    />

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
import SceneFilterSortPanel from './SceneFilterSortPanel.vue'
import SceneTabelPanel from './SceneTabelPanel.vue'
import type { apiListResult } from '@/types/common'

// 获取列表
import type { ISceneItem } from '@/types/scene'
const getListLoading = ref<boolean>(false)
const data = ref<ISceneItem[]>([])
import { useSceneStore } from '@/stores/modules/scene'
const {
  getScenes: getScenesAction,
  changeScenesStatus: changeScenesStatusAction,
  deleteScenes: deleteScenesAction
} = useSceneStore()
const getList = async (): Promise<apiListResult<ISceneItem>> => {
  getListLoading.value = true
  const res = await getScenesAction(
    searchQuery.value,
    status.value,
    isOuterLink.value,
    pageNum.value,
    pageSize.value
  )

  data.value = res.rows
  getListLoading.value = false
  return res
}

import { usePager } from '@/composables/usePager'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
import { useDelete } from '@/composables/useDelete'
const delTitle = ref('')
const delId = ref<string | number>('')
const { doDelAction } = useDelete(
  () => `是否确认删除 ${delTitle.value} ？`,
  async () => {
    await deleteScenesAction([delId.value])
    refresh()
  }
)
const handleDelete = (id: string | number, title: string) => {
  delTitle.value = title
  delId.value = id
  doDelAction()
}

// 修改状态
import { useChangeStatus } from '@/composables/useChangeStatus'
import { ActiveStatus } from '@/constants/mapData'
const changeTitle = ref('')
const changeId = ref<string | number>('')
const changeStatus = ref<ActiveStatus>()
const { doChangeAction } = useChangeStatus(
  () =>
    `是否确认 ${changeStatus.value === ActiveStatus.Active ? '启用' : '停用'} ${changeTitle.value} ？`,
  async () => {
    if (!changeStatus.value) {
      ElMessage.error('请选择状态')
      return
    }
    await changeScenesStatusAction([changeId.value], changeStatus.value)
    refresh()
  }
)
const handleChangeStatus = (id: string | number, title: string, newStatus: ActiveStatus) => {
  changeTitle.value = title
  changeId.value = id
  changeStatus.value = newStatus
  doChangeAction()
}

// 搜索
const searchQuery = ref<string>('')
const handleSearch = () => {
  refresh()
}

const status = ref<string>('')
const isOuterLink = ref<boolean>()
const reset = () => {
  pageNum.value = 1
  refresh()
}

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
