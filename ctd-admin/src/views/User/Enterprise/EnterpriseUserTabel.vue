<template>
  <BaseTable
    :data="data"
    :loading="loading"
    :columns="columns"
    :propLabelMap="ENTERPRISE_USER_PROP_LABEL_MAP"
  >
    <template #industryType="{ scope }">
      <el-tag :type="industryTypeColor(scope.row.industryType)">{{
        industryTypeLabel(scope.row.industryType)
      }}</el-tag>
    </template>
    <template #companySize="{ scope }">
      <el-tag :type="companySizeColor(scope.row.companySize)">{{
        companySizeLabel(scope.row.companySize)
      }}</el-tag>
    </template>

    <template #status="{ scope }">
      <el-tag :type="statusColor(scope.row.status)">{{ statusLabel(scope.row.status) }}</el-tag>
    </template>

    <template #actions="{ scope }">
      <el-button
        v-if="scope.row.status === UserStatus.Suspended"
        link
        type="primary"
        size="small"
        @click="changeStatus(scope.row.id, scope.row.fullName, UserStatus.Active)"
      >
        启用
      </el-button>
      <el-button
        v-if="scope.row.status === UserStatus.Active"
        link
        type="primary"
        size="small"
        @click="changeStatus(scope.row.id, scope.row.fullName, UserStatus.Suspended)"
      >
        停用
      </el-button>
      <el-button link type="primary" size="small" @click="goDetail(scope.row.id)">
        查看详情
      </el-button>
      <el-button
        link
        type="primary"
        size="small"
        @click="deleteRow(scope.row.id, scope.row.fullName)"
      >
        删除
      </el-button>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue'
import type { IEnterpriseUserItem } from '@/types/user'
import { ENTERPRISE_USER_PROP_LABEL_MAP } from '@/constants/mapData/user'
import { columns } from './config'
defineProps<{ data: IEnterpriseUserItem[]; loading: boolean }>()

import { USER_STATUS_MAP, USER_STATUS_COLOR_MAP, UserStatus } from '@/constants/mapData/user'
const statusColor = (status: UserStatus) => USER_STATUS_COLOR_MAP[status]
const statusLabel = (status: UserStatus) => USER_STATUS_MAP[status]

import { INDUSTRY_TYPE_MAP, INDUSTRY_TYPE_COLOR_MAP, IndustryType } from '@/constants/mapData/user'
const industryTypeColor = (industry: IndustryType) => INDUSTRY_TYPE_COLOR_MAP[industry]
const industryTypeLabel = (industry: IndustryType) => INDUSTRY_TYPE_MAP[industry]

import {
  COMPANY_SIZE_TYPE_MAP,
  COMPANY_SIZE_TYPE_COLOR_MAP,
  CompanySizeType
} from '@/constants/mapData/user'
const companySizeColor = (companySize: CompanySizeType) => COMPANY_SIZE_TYPE_COLOR_MAP[companySize]
const companySizeLabel = (companySize: CompanySizeType) => COMPANY_SIZE_TYPE_MAP[companySize]

const router = useRouter()

const goDetail = (id: number | string) => {
  router.push({
    name: 'enterprise-detail',
    params: {
      id
    }
  })
}

const emit = defineEmits<{
  (e: 'delete', id: number | string, label: string): void
  (e: 'changeStatus', id: number | string, label: string, newStatus: UserStatus): void
}>()

const deleteRow = (id: number | string, label: string) => {
  emit('delete', id, label)
}
const changeStatus = (id: number | string, label: string, newStatus: UserStatus) => {
  emit('changeStatus', id, label, newStatus)
}
</script>

<style scoped lang="scss"></style>
