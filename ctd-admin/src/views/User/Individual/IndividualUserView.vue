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

    <filter-sort-panel
      v-model:filter-list="filterList"
      v-model:sort-list="sortList"
      v-model:column-list="columnList"
      :propLabelMap="INDIVIDUAL_USER_PROP_LABEL_MAP"
      @refresh="reset"
    />

    <individual-user-tabel
      :data="data"
      :loading="getListLoading"
      :column-list="columnList"
      :propLabelMap="INDIVIDUAL_USER_PROP_LABEL_MAP"
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
defineOptions({
  name: 'user-individual'
})

import FilterSortPanel from '@/components/FilterSortPanel.vue'
import IndividualUserTabel from './IndividualUserTabel.vue'
import { INDIVIDUAL_USER_PROP_LABEL_MAP } from '@/constants/mapData/user'

// 获取列表
const getListLoading = ref<boolean>(false)
const data = ref<IIndividualUserItem[]>([])
import { useUserStore } from '@/stores/modules/user'
const {
  getIndividualUsers: getIndividualUsersAction,
  changeUsersStatus: changeUsersStatusAction,
  deleteUsers: deleteUsersAction
} = useUserStore()
const getList = async (): Promise<number> => {
  getListLoading.value = true
  const res = await getIndividualUsersAction(
    searchQuery.value,
    filterDTO.value,
    sortList.value,
    pageNum.value,
    pageSize.value
  )
  data.value = res.rows
  getListLoading.value = false
  return res.total
}

import { usePager } from '@/composables/usePager'
import type { IIndividualUserItem } from '@/types/user'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
import { useDelete } from '@/composables/useDelete'
const delLabel = ref('')
const delId = ref<string | number>('')
const { doDelAction } = useDelete(
  () => `是否确认删除 ${delLabel.value} ？`,
  async () => {
    await deleteUsersAction([delId.value])
    refresh()
  }
)
const handleDelete = (id: string | number, fullName: string) => {
  delLabel.value = fullName
  delId.value = id
  doDelAction()
}

// 修改状态
import { useChangeStatus } from '@/composables/useChangeStatus'
import { UserStatus } from '@/constants/mapData/user'
const changeLabel = ref('')
const changeId = ref<string | number>('')
const changeStatus = ref<UserStatus>()
const { doChangeAction } = useChangeStatus(
  () =>
    `是否确认 ${changeStatus.value === UserStatus.Active ? '启用' : '停用'} ${changeLabel.value} ？`,
  async () => {
    if (!changeStatus.value) {
      ElMessage.error('请选择状态')
      return
    }
    await changeUsersStatusAction([changeId.value], changeStatus.value)
    refresh()
  }
)
const handleChangeStatus = (id: string | number, fullName: string, newStatus: UserStatus) => {
  changeLabel.value = fullName
  changeId.value = id
  changeStatus.value = newStatus
  doChangeAction()
}

// 搜索
const searchQuery = ref<string>('')
const handleSearch = () => {
  refresh()
}

import { useTable } from '@/composables/useTable'
import { sortList as sortDate, filterList as filterDate, columnList as columnDate } from './config'
const { sortList, filterList, columnList, filterDTO } = useTable(sortDate, filterDate, columnDate)

const reset = () => {
  searchQuery.value = ''
  refresh()
}
</script>

<style scoped lang="scss">
.individual-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
