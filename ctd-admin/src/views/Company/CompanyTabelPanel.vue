<template>
  <el-table
    :data="data"
    v-loading="loading"
    header-cell-class-name="table-header-row"
    cell-class-name="table-row-cell"
  >
    <el-table-column prop="name" label="公司名称" min-width="240" />
    <el-table-column prop="link" label="链接" width="200" />
    <el-table-column prop="partnerType" label="合作伙伴" width="120">
      <template #default="scope">
        <el-tag :type="partnerTypesColor(scope.row.partnerType)">{{
          partnerTypesLabel(scope.row.partnerType)
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="isShowInFooter" label="友情链接" width="120">
      <template #default="scope">
        <el-tag v-if="scope.row.isShowInFooter" type="success">{{ '是' }}</el-tag>
        <el-tag v-else type="warning">{{ '否' }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="120">
      <template #default="scope">
        <el-tag :type="stautsColor(scope.row.status)">{{ statusLabel(scope.row.status) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="130" />
    <el-table-column prop="updateTime" label="更新时间" width="130" />
    <el-table-column fixed="right" label="操作" align="right" width="220">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="edit(scope.row.id)"> 编辑 </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Inactive"
          link
          type="primary"
          size="small"
          @click="changeStatuwRow(scope.row.id, scope.row.name, ActiveStatus.Active)"
        >
          启用
        </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Active"
          link
          type="primary"
          size="small"
          @click="changeStatuwRow(scope.row.id, scope.row.name, ActiveStatus.Inactive)"
        >
          停用
        </el-button>
        <el-button link type="primary" size="small" @click="goDetail(scope.row.id)"
          >查看详情</el-button
        >
        <el-button link type="primary" size="small" @click="deleteRow(scope.row.id, scope.row.name)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { ICompanyItem } from '@/types/company'
defineProps<{ data: ICompanyItem[]; loading: boolean }>()

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]
import {
  PARTNER_TYPES_COLOR_MAP,
  PARTNER_TYPES_MAP,
  PartnerTypes
} from '@/constants/mapData/company'
const partnerTypesColor = (partnerType: PartnerTypes) => PARTNER_TYPES_COLOR_MAP[partnerType]
const partnerTypesLabel = (partnerType: PartnerTypes) => PARTNER_TYPES_MAP[partnerType]

const router = useRouter()
const edit = (id: number | string) => {
  router.push({
    name: 'company-edit',
    params: {
      id
    }
  })
}

const goDetail = (id: number | string) => {
  router.push({
    name: 'company-detail',
    params: {
      id
    }
  })
}

const emit = defineEmits<{
  (e: 'delete', id: number | string, name: string): void
  (e: 'changeStatus', id: number | string, name: string, newStatus: ActiveStatus): void
}>()

const deleteRow = (id: number | string, name: string) => {
  emit('delete', id, name)
}
const changeStatuwRow = (id: number | string, name: string, newStatus: ActiveStatus) => {
  emit('changeStatus', id, name, newStatus)
}
</script>

<style scoped lang="scss">
.icon {
  @apply w-14 h-14 object-cover;
}
</style>
