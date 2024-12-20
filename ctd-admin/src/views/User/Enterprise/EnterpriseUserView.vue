<template>
  <div class="enterprise-root-container">
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
    </div>

    <el-divider class="!my-0" />

    <enterprise-user-tabel
      :data="data"
      :loading="getListLoading"
      :column-list="columnList"
      :propLabelMap="ENTERPRISE_USER_PROP_LABEL_MAP"
      @delete="handleDelete"
      @changeStatus="handleChangeStatus"
    >
      <template #filter>
        <filter-sort-panel
          v-model:filter-list="filterList"
          v-model:sort-list="sortList"
          v-model:column-list="columnList"
          :propLabelMap="ENTERPRISE_USER_PROP_LABEL_MAP"
          @reset="reset"
          @apply="refresh"
        />
      </template>
    </enterprise-user-tabel>

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
  name: 'user-enterprise'
})

import FilterSortPanel from '@/components/FilterSortPanel.vue'
import EnterpriseUserTabel from './EnterpriseUserTabel.vue'
import { ENTERPRISE_USER_PROP_LABEL_MAP } from '@/constants/mapData/user'
import { useChangeUserStatus, useDeleteUser, useSearchUser } from '../useUser'

// 获取列表
const getListLoading = ref<boolean>(false)

import type { IEnterpriseUserItem } from '@/types/user'
const data = ref<IEnterpriseUserItem[]>([])

import { useUserStore } from '@/stores/modules/user'
const { getEnterpriseUsers: getEnterpriseUsersAction } = useUserStore()

const getList = async (): Promise<number> => {
  getListLoading.value = true
  const res = await getEnterpriseUsersAction(
    searchQuery.value,
    filterDTO.value,
    sortList.value,
    columnList.value,
    pageNum.value,
    pageSize.value
  )

  data.value = res.rows
  getListLoading.value = false
  return res.total
}

// 筛选和表格
import { useTable } from '@/composables/useTable'
import { sortList as sortDate, filterList as filterDate, columnList as columnDate } from './config'
const { sortList, filterList, columnList, filterDTO } = useTable(sortDate, filterDate, columnDate)

// 分页
import { usePager } from '@/composables/usePager'
const { pageNum, pageSize, total, refresh } = usePager(getList)

// 删除
const { handleDelete } = useDeleteUser(refresh)

// 修改状态
const { handleChangeStatus } = useChangeUserStatus(refresh)

// 搜索
const { searchQuery, reset } = useSearchUser(refresh)
</script>

<style scoped lang="scss">
.enterprise-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
