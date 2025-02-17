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
      <template #linkType="{ scope }">
        <el-tag :type="linkTypeColor(scope.row.linkType)">{{
          linkTypeLabel(scope.row.linkType)
        }}</el-tag>
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
          @click="changeStatus(scope.row.id, scope.row.title, ActiveStatus.Active)"
        >
          启用
        </el-button>
        <el-button
          v-if="scope.row.status === ActiveStatus.Active"
          class="default-btn"
          link
          type="primary"
          size="small"
          @click="changeStatus(scope.row.id, scope.row.title, ActiveStatus.Inactive)"
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
          @click="deleteRow(scope.row.id, scope.row.title)"
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
import type { IBannerItem } from '@/types/banner'
const { data } = defineProps<{
  data: IBannerItem[]
  loading: boolean
  columnList: ITableColumn<IBannerItem>[]
  propLabelMap: IPropLabelMap<IBannerItem>
}>()

const selectedIds = ref<string[]>([])

const rowKey = (row: IBannerItem) => String(row.id)

import { ACTIVE_STATUS_MAP, ACTIVE_STATUS_COLOR_MAP, ActiveStatus } from '@/constants/mapData'
const statusColor = (status: ActiveStatus) => ACTIVE_STATUS_COLOR_MAP[status]
const statusLabel = (status: ActiveStatus) => ACTIVE_STATUS_MAP[status]

import { LINK_TYPES_COLOR_MAP, LINK_TYPES_MAP, LinkTypes } from '@/constants/mapData/banner'
const linkTypeColor = (linkType: LinkTypes) => LINK_TYPES_COLOR_MAP[linkType]
const linkTypeLabel = (linkType: LinkTypes) => LINK_TYPES_MAP[linkType]

const router = useRouter()
const edit = (id: number | string) => {
  router.push({
    name: 'banner-edit',
    params: {
      id
    }
  })
}

const goDetail = (id: number | string) => {
  router.push({
    name: 'banner-detail',
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
  const filteredBanners = selectedIds.value
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

  const filteredIds = filteredBanners.map((banner) => (banner ? String(banner.id) : ''))
  const bannerTitles = filteredBanners.map((banner) => (banner ? banner.title : '')).join(', ')

  emit('changeStatus', filteredIds, bannerTitles, newStatus)
}
</script>

<style scoped lang="scss"></style>
