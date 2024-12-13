<template>
  <div class="individual-root-container">
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
    </div>

    <el-divider class="!my-0" />

    <user-filter-sort-panel v-model:status="status" @refresh="reset" />

    <user-tabel-panel
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
import UserFilterSortPanel from './EnterpriseUserFilterSortPanel.vue'
import UserTabelPanel from './EnterpriseUserTabelPanel.vue'
import type { apiListResult } from '@/types/common'

// 获取列表
const getListLoading = ref<boolean>(false)
const data = ref<IEnterpriseUserItem[]>([])
import { useUserStore } from '@/stores/modules/user'
const {
  getEnterpriseUser: getEnterpriseUserAction,
  changeUsersStatus: changeUsersStatusAction,
  deleteUsers: deleteUsersAction
} = useUserStore()
const getList = async (): Promise<apiListResult<IEnterpriseUserItem>> => {
  getListLoading.value = true
  const res = await getEnterpriseUserAction(
    searchQuery.value,
    status.value,
    pageNum.value,
    pageSize.value
  )

  data.value = res.rows
  getListLoading.value = false
  return res
}

import { usePager } from '@/composables/usePager'
import type { IEnterpriseUserItem } from '@/types/user'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
import { useDelete } from '@/composables/useDelete'
const delTitle = ref('')
const delId = ref<string | number>('')
const { doDelAction } = useDelete(
  () => `是否确认删除 ${delTitle.value} ？`,
  async () => {
    await deleteUsersAction([delId.value])
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
import { UserStatus } from '@/constants/mapData/user'
const changeTitle = ref('')
const changeId = ref<string | number>('')
const changeStatus = ref<UserStatus>()
const { doChangeAction } = useChangeStatus(
  () =>
    `是否确认 ${changeStatus.value === UserStatus.ACTIVE ? '启用' : '停用'} ${changeTitle.value} ？`,
  async () => {
    if (!changeStatus.value) {
      ElMessage.error('请选择状态')
      return
    }
    await changeUsersStatusAction([changeId.value], changeStatus.value)
    refresh()
  }
)
const handleChangeStatus = (id: string | number, title: string, userStatus: UserStatus) => {
  changeTitle.value = title
  changeId.value = id
  changeStatus.value = userStatus
  doChangeAction()
}

// 搜索
const searchQuery = ref<string>('')
const handleSearch = () => {
  refresh()
}

const status = ref<UserStatus | null>(null)
const reset = () => {
  pageNum.value = 1
  refresh()
}
</script>

<style scoped lang="scss">
.individual-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
