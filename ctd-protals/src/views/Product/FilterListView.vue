<template>
  <el-card shadow="always" flex flex-col w-260 bg-white px-2>
    <filter-item
      v-for="(filter, index) in filters"
      :key="index"
      :label="filter.label"
      :items="filter.items"
      v-model="model[index]"
    ></filter-item>
  </el-card>
</template>

<script setup lang="ts">
import FilterItem from './FilterItem.vue'

const model = defineModel<string[]>({ required: true })

const filters = ref([
  {
    label: '产品形态',
    items: [
      '全部',
      '文档',
      '表格',
      '数据包',
      '多媒体',
      'API',
      '虚拟艺术品',
      '课程',
      '地图',
      '定制页面',
      '定制产品',
      '实体商品',
      '其他'
    ]
  },
  { label: '数据领域', items: ['全部', '景区', '交通', '酒店', '商铺', '气象', '演出', '其他'] },
  {
    label: '产品类型',
    items: ['全部', '行业报告', '游客画像', '三维场景', '地理信息', '原始数据', '其他']
  },
  {
    label: '数据来源',
    items: ['全部', '平台数据', '政府数据', '第三方可信数据', '公开数据', '其他']
  },
  {
    label: '区域',
    items: [
      '全部',
      '西城区',
      '东城区',
      '朝阳区',
      '丰台区',
      '石景山区',
      '海淀区',
      '通州区',
      '大兴区',
      '房山区',
      '门头沟区',
      '昌平区',
      '顺义区',
      '平谷区',
      '延庆区',
      '怀柔区',
      '密云区'
    ]
  },
  { label: '时间', items: ['全部', '节假日', '平日', '旺季', '淡季', '其他'] }
])
</script>

<style scoped lang="scss"></style>
