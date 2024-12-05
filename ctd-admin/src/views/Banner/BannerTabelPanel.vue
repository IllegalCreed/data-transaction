<template>
  <el-table
    :data="data"
    v-loading="loading"
    header-cell-class-name="table-header-row"
    cell-class-name="table-row-cell"
  >
    <el-table-column prop="title" label="场景标题" min-width="300" />
    <el-table-column prop="readCount" label="阅读数" width="80" />
    <el-table-column prop="companyName" label="相关公司" width="200" />
    <el-table-column label="外链" width="120">
      <template #default="scope">
        <el-tag v-if="scope.row.isOuterLink" type="success">{{ '是' }}</el-tag>
        <el-tag v-else type="warning">{{ '否' }}</el-tag>
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
        <el-button link type="primary" size="small" @click="edit(scope.row.id)"> 编辑 </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Inactive"
          link
          type="primary"
          size="small"
          @click="changeStatuwRow(scope.row.id, scope.row.title, ActiveStatus.Active)"
        >
          启用
        </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Active"
          link
          type="primary"
          size="small"
          @click="changeStatuwRow(scope.row.id, scope.row.title, ActiveStatus.Inactive)"
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
          @click="deleteRow(scope.row.id, scope.row.title)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { ISceneItem } from '@/types/scene'
defineProps<{ data: ISceneItem[]; loading: boolean }>()

import { ACTIVE_STATUS_COLOR_MAP, ACTIVE_STATUS_MAP, ActiveStatus } from '@/constants/mapData'
const stautsColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
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
  (e: 'delete', id: number | string, title: string): void
  (e: 'changeStatus', id: number | string, title: string, newStatus: ActiveStatus): void
}>()

const deleteRow = (id: number | string, title: string) => {
  emit('delete', id, title)
}
const changeStatuwRow = (id: number | string, title: string, newStatus: ActiveStatus) => {
  emit('changeStatus', id, title, newStatus)
}
</script>

<style scoped lang="scss">
.icon {
  @apply w-14 h-14 object-cover;
}
</style>
