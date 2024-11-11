<template>
  <el-table :data="data" header-cell-class-name="table-header-row" cell-class-name="table-row-cell">
    <el-table-column prop="icon" label="封面" width="80" align="center">
      <template #default="scope">
        <img class="icon" :src="scope.row.icon" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="展示售价" />
    <el-table-column prop="code" label="已售" />
    <el-table-column prop="code" label="评价" />
    <el-table-column prop="code" label="当前版本" />
    <el-table-column prop="code" label="创建时间" />
    <el-table-column prop="code" label="更新时间" />
    <el-table-column label="状态" width="120">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 0" key="normal" type="success">正常</el-tag>
        <el-tag v-else key="disable" type="danger">停用</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="250">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="showEdit(scope.row.id)">
          编辑
        </el-button>
        <el-button link type="primary" size="small" @click="changeState(scope.row)">{{
          scope.row.status === 0 ? '下架' : '上架'
        }}</el-button>
        <el-button link type="primary" size="small" @click="goDetail(scope.row.id)"
          >查看详情</el-button
        >
        <el-button link type="primary" size="small" @click="deleteRow(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product'

defineProps<{ data: IProduct[] }>()

const showEdit = (id: number) => {
  console.log(id)
}

const changeState = (row: IProduct) => {
  console.log(row)
}

const goDetail = (id: number) => {
  console.log(id)
}

const deleteRow = (row: IProduct) => {
  console.log(row)
}
</script>

<style scoped lang="scss"></style>
