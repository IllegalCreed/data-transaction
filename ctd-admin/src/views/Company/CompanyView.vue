<template>
  <div class="company-root-container">
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

      <el-button class="default-btn" @click="handleCreate">新建公司</el-button>
    </div>

    <el-divider class="!my-0" />

    <company-filter-sort-panel
      v-model:status="status"
      v-model:partner-type="partnerType"
      v-model:is-show-in-footer="isShowInFooter"
      @refresh="reset"
    />

    <company-tabel-panel
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
import CompanyFilterSortPanel from './CompanyFilterSortPanel.vue'
import CompanyTabelPanel from './CompanyTabelPanel.vue'
import type { apiListResult } from '@/types/common'

// 获取列表
import type { ICompanyItem } from '@/types/company'
const getListLoading = ref<boolean>(false)
const data = ref<ICompanyItem[]>([])
import { useCompanyStore } from '@/stores/modules/company'
const {
  getCompanies: getCompaniesAction,
  changeCompaniesStatus: changeCompaniesStatusAction,
  deleteCompanies: deleteCompaniesAction
} = useCompanyStore()
const getList = async (): Promise<apiListResult<ICompanyItem>> => {
  getListLoading.value = true
  const res = await getCompaniesAction(
    searchQuery.value,
    status.value,
    partnerType.value,
    isShowInFooter.value,
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
    await deleteCompaniesAction([delId.value])
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
import type { PartnerTypes } from '@/constants/mapData/company'
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
    await changeCompaniesStatusAction([changeId.value], changeStatus.value)
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
const partnerType = ref<PartnerTypes>()
const isShowInFooter = ref<boolean>()
const reset = () => {
  pageNum.value = 1
  refresh()
}

// 新建
const router = useRouter()
const handleCreate = () => {
  router.push({
    name: 'company-edit',
    params: {
      id: -1
    }
  })
}
</script>

<style scoped lang="scss">
.company-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
