<template>
  <el-table
    :data="data"
    v-loading="loading"
    header-cell-class-name="table-header-row"
    cell-class-name="table-row-cell"
  >
    <el-table-column prop="email" label="邮件" min-width="200" />
    <el-table-column prop="fullName" label="姓名" width="120" />
    <el-table-column prop="identificationNumber" label="身份证号" width="200" />
    <el-table-column prop="phoneNumber" label="手机号" width="180" />
    <el-table-column prop="gender" label="性别" width="120">
      <template #default="scope">
        <el-tag :type="genderColor(scope.row.gender)">{{ genderLabel(scope.row.gender) }}</el-tag>
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
import type { IIndividualUserItem } from '@/types/user'
defineProps<{ data: IIndividualUserItem[]; loading: boolean }>()

import { USER_STATUS_MAP, USER_STATUS_COLOR_MAP, UserStatus } from '@/constants/mapData/user'
const stautsColor = (status: UserStatus) => USER_STATUS_COLOR_MAP[status]
const statusLabel = (status: UserStatus) => USER_STATUS_MAP[status]

import { GENDER_TYPES_MAP, GENDER_TYPES_COLOR_MAP, GenderType } from '@/constants/mapData/user'
const genderColor = (gender: GenderType) => GENDER_TYPES_COLOR_MAP[gender]
const genderLabel = (gender: GenderType) => GENDER_TYPES_MAP[gender]

const router = useRouter()

const goDetail = (id: number | string) => {
  router.push({
    name: 'individual-detail',
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
