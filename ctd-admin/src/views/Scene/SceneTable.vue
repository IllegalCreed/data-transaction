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
        <el-button class="default-btn" @click="changeAllStatus(ActiveStatus.Active)">
          <template v-slot:icon>
            <i-qlementine-icons:success-16 />
          </template>
          批量启用
        </el-button>
        <el-button class="default-btn" @click="changeAllStatus(ActiveStatus.Inactive)">
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
      <template #coverImageUrl="{ scope }">
        <el-image
          class="w-14 h-14"
          :src="scope.row.coverImageUrl"
          :preview-src-list="scope.row.coverImageUrl ? [scope.row.coverImageUrl] : undefined"
          fit="cover"
        >
        </el-image>
      </template>

      <template #isOuterLink="{ scope }">
        <el-tag v-if="scope.row.isOuterLink" type="success">{{ '是' }}</el-tag>
        <el-tag v-else type="warning">{{ '否' }}</el-tag>
      </template>

      <template #status="{ scope }">
        <el-tag :type="statusColor(scope.row.status)">{{ statusLabel(scope.row.status) }}</el-tag>
      </template>

      <template #actions="{ scope }">
        <el-button class="default-btn" link type="primary" size="small" @click="edit(scope.row.id)">
          编辑
        </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Inactive"
          class="default-btn"
          link
          type="primary"
          size="small"
          @click="changeStatus(scope.row.id, scope.row.name, ActiveStatus.Active)"
        >
          启用
        </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Active"
          class="default-btn"
          link
          type="primary"
          size="small"
          @click="changeStatus(scope.row.id, scope.row.name, ActiveStatus.Inactive)"
        >
          停用
        </el-button>
        <el-button
          class="default-btn"
          link
          type="primary"
          size="small"
          @click="goDetail(scope.row.id)"
        >
          查看详情
        </el-button>
        <el-button
          class="default-btn"
          link
          type="primary"
          size="small"
          @click="deleteRow(scope.row.id, scope.row.name)"
        >
          删除
        </el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue'
import type { ITableColumn } from '@/types/table'
import type { IPropLabelMap } from '@/types/common'
import type { ISceneItem } from '@/types/scene'
const { data } = defineProps<{
  data: ISceneItem[]
  loading: boolean
  columnList: ITableColumn<ISceneItem>[]
  propLabelMap: IPropLabelMap<ISceneItem>
}>()

const selectedIds = ref<string[]>([])

const rowKey = (row: ISceneItem) => String(row.id)

import { ACTIVE_STATUS_MAP, ACTIVE_STATUS_COLOR_MAP, ActiveStatus } from '@/constants/mapData'
const statusColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]

const router = useRouter()
const edit = (id: number | string) => {
  router.push({
    name: 'scene-edit',
    params: {
      id
    }
  })
}

const goDetail = (id: number | string) => {
  router.push({
    name: 'scene-detail',
    params: {
      id
    }
  })
}

const emit = defineEmits<{
  (e: 'delete', id: (number | string)[], label: string): void
  (e: 'changeStatus', id: (number | string)[], label: string, newStatus: ActiveStatus): void
}>()

const deleteRow = (id: number | string, label: string) => {
  emit('delete', [id], label)
}
const changeStatus = (id: number | string, label: string, newStatus: ActiveStatus) => {
  emit('changeStatus', [id], label, newStatus)
}

const deleteAll = () => {
  emit('delete', selectedIds.value, '选中场景')
}
const changeAllStatus = (newStatus: ActiveStatus) => {
  const filteredScenes = selectedIds.value
    .map((id) => data.find((user) => String(user.id) === id))
    .filter((user) => {
      if (!user) return false

      if (newStatus === ActiveStatus.Active) {
        return user.status === ActiveStatus.Inactive
      }

      if (newStatus === ActiveStatus.Inactive) {
        return user.status === ActiveStatus.Active
      }

      return false
    })

  const filteredIds = filteredScenes.map((scene) => (scene ? String(scene.id) : ''))
  const sceneTitles = filteredScenes.map((scene) => (scene ? scene.title : '')).join(', ')

  emit('changeStatus', filteredIds, sceneTitles, newStatus)
}
</script>

<style scoped lang="scss"></style>
