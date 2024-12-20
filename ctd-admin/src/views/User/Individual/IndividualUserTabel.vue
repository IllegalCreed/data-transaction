<template>
  <BaseTable :data="data" :loading="loading" :columns="columnList" :propLabelMap="propLabelMap">
    <!-- Gender Column Custom Rendering -->
    <template #gender="{ scope }">
      <el-tag :type="genderColor(scope.row.gender)">{{ genderLabel(scope.row.gender) }}</el-tag>
    </template>

    <!-- Status Column Custom Rendering -->
    <template #status="{ scope }">
      <el-tag :type="statusColor(scope.row.status)">{{ statusLabel(scope.row.status) }}</el-tag>
    </template>

    <!-- Actions Column Custom Rendering -->
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
import type { IIndividualUserItem } from '@/types/user'
defineProps<{
  data: IIndividualUserItem[]
  loading: boolean
  columnList: ITableColumn<IIndividualUserItem>[]
  propLabelMap: IPropLabelMap<IIndividualUserItem>
}>()

import { USER_STATUS_MAP, USER_STATUS_COLOR_MAP, UserStatus } from '@/constants/mapData/user'
const statusColor = (status: UserStatus) => USER_STATUS_COLOR_MAP[status]
const statusLabel = (status: UserStatus) => USER_STATUS_MAP[status]

import { GENDER_TYPES_MAP, GENDER_TYPES_COLOR_MAP, GenderType } from '@/constants/mapData/user'
import type { ITableColumn } from '@/types/table'
import type { IPropLabelMap } from '@/types/common'
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
