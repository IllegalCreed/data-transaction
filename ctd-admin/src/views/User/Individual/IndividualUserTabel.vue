<template>
  <div flex flex-col gap-4>
    <div flex flex-row justify-between>
      <div v-if="selectedIds.length > 0" flex flex-row>
        <el-button class="default-btn" @click="deleteAll">
          <template v-slot:icon>
            <i-material-symbols-light:delete-outline />
          </template>
          批量删除
        </el-button>
        <el-button class="default-btn" @click="changeAllStatus(UserStatus.Active)">
          <template v-slot:icon>
            <i-qlementine-icons:success-16 />
          </template>
          批量启用
        </el-button>
        <el-button class="default-btn" @click="changeAllStatus(UserStatus.Suspended)">
          <template v-slot:icon>
            <i-qlementine-icons:minus-circle-16 />
          </template>
          批量停用
        </el-button>
      </div>
      <div v-else></div>
      <slot name="filter"></slot>
    </div>
    <BaseTable
      v-model="selectedIds"
      :data="data"
      :rowKey="rowKey"
      :loading="loading"
      :columns="columnList"
      :propLabelMap="propLabelMap"
    >
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
  </div>
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue'
import type { IIndividualUserItem } from '@/types/user'
const { data } = defineProps<{
  data: IIndividualUserItem[]
  loading: boolean
  columnList: ITableColumn<IIndividualUserItem>[]
  propLabelMap: IPropLabelMap<IIndividualUserItem>
}>()

const selectedIds = ref<string[]>([])

const rowKey = (row: IIndividualUserItem) => String(row.id)

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
  (e: 'delete', id: (number | string)[], label: string): void
  (e: 'changeStatus', id: (number | string)[], label: string, newStatus: UserStatus): void
}>()

const deleteRow = (id: number | string, label: string) => {
  emit('delete', [id], label)
}
const changeStatus = (id: number | string, label: string, newStatus: UserStatus) => {
  emit('changeStatus', [id], label, newStatus)
}

const deleteAll = () => {
  emit('delete', selectedIds.value, '选中用户')
}
const changeAllStatus = (newStatus: UserStatus) => {
  const filteredUsers = selectedIds.value
    .map((id) => data.find((user) => String(user.id) === id))
    .filter((user) => {
      if (!user) return false

      // 如果 newStatus 为 'active'，筛选出状态是 'Suspended' 的用户
      if (newStatus === UserStatus.Active) {
        return user.status === UserStatus.Suspended
      }

      // 如果 newStatus 为 'Suspended'，筛选出状态是 'Active' 的用户
      if (newStatus === UserStatus.Suspended) {
        return user.status === UserStatus.Active
      }

      return false
    })

  const filteredIds = filteredUsers.map((user) => (user ? String(user.id) : ''))
  const userNames = filteredUsers.map((user) => (user ? user.fullName : '')).join(', ')

  emit('changeStatus', filteredIds, userNames, newStatus)
}
</script>

<style scoped lang="scss"></style>
