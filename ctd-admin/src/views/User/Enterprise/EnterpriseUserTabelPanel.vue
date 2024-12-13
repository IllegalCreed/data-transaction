<template>
  <el-table
    :data="data"
    v-loading="loading"
    header-cell-class-name="table-header-row"
    cell-class-name="table-row-cell"
  >
    <el-table-column prop="email" label="邮件" min-width="220" />
    <el-table-column prop="enterpriseName" label="企业名称" width="200" />
    <el-table-column prop="registrationNumber" label="统一社会信用代码" width="200" />
    <el-table-column prop="contactPersonName" label="联系人姓名" width="180" />
    <el-table-column prop="contactPhoneNumber" label="联系人电话" width="180" />
    <el-table-column prop="industryType" label="行业类别" width="300">
      <template #default="scope">
        <el-tag :type="industryTypeColor(scope.row.industryType)">{{
          industryTypeLabel(scope.row.industryType)
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="companySize" label="企业规模" width="300">
      <template #default="scope">
        <el-tag :type="companySizeColor(scope.row.companySize)">{{
          companySizeLabel(scope.row.companySize)
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="120">
      <template #default="scope">
        <el-tag :type="stautsColor(scope.row.status)">{{ statusLabel(scope.row.status) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="130" />
    <el-table-column prop="updateTime" label="更新时间" width="130" />
    <el-table-column fixed="right" label="操作" align="right" width="220">
      <template #default="scope">
        <el-button
          v-if="scope.row.status === UserStatus.Suspended"
          link
          type="primary"
          size="small"
          @click="changeStatuwRow(scope.row.id, scope.row.fullName, UserStatus.Active)"
        >
          启用
        </el-button>
        <el-button
          v-if="scope.row.status === UserStatus.Active"
          link
          type="primary"
          size="small"
          @click="changeStatuwRow(scope.row.id, scope.row.fullName, UserStatus.Suspended)"
        >
          停用
        </el-button>
        <el-button link type="primary" size="small" @click="goDetail(scope.row.id)"
          >查看详情</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="deleteRow(scope.row.id, scope.row.fullName)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IEnterpriseUserItem } from '@/types/user'
defineProps<{ data: IEnterpriseUserItem[]; loading: boolean }>()

import { USER_STATUS_MAP, USER_STATUS_COLOR_MAP, UserStatus } from '@/constants/mapData/user'
const stautsColor = (status: UserStatus) => USER_STATUS_COLOR_MAP[status]
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
  (e: 'delete', id: number | string, fullName: string): void
  (e: 'changeStatus', id: number | string, fullName: string, newStatus: UserStatus): void
}>()

const deleteRow = (id: number | string, fullName: string) => {
  emit('delete', id, fullName)
}
const changeStatuwRow = (id: number | string, fullName: string, newStatus: UserStatus) => {
  emit('changeStatus', id, fullName, newStatus)
}
</script>

<style scoped lang="scss">
.icon {
  @apply w-14 h-14 object-cover;
}
</style>
