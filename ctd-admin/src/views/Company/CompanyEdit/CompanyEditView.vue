<template>
  <div class="company-edit-root-container">
    <span class="panel-title">{{ id > 0 ? '编辑公司' : '新建公司' }}</span>
    <el-form
      @submit.prevent
      :model="companyInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="公司标题" prop="name" max-w-120>
        <el-input v-model="companyInfo.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="公司简介：" prop="description" max-w-120>
        <el-input
          v-model="companyInfo.description"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        />
      </el-form-item>
      <el-form-item label="公司链接" prop="link" max-w-120>
        <el-input v-model="companyInfo.link" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="合作伙伴" prop="partnerType" max-w-120>
        <el-select v-model="companyInfo.partnerType" placeholder="请选择">
          <el-option
            v-for="item in partnerTypesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" max-w-120>
        <el-select v-model="companyInfo.status" placeholder="请选择">
          <el-option
            v-for="item in activeStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否为友情链接" prop="isShowInFooter">
        <el-switch v-model="companyInfo.isShowInFooter" />
      </el-form-item>
      <el-form-item label="公司商标" prop="logoUrl">
        <image-picker v-model="imageRef" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'company-edit'
})

import { type FormInstance, type FormRules } from 'element-plus'
import ImagePicker from '@/components/ImagePicker.vue'
import { ActiveStatus } from '@/constants/mapData'
import { PartnerTypes } from '@/constants/mapData/company'
import type { ICompanyDTO } from '@/types/company'

const id = useRouteParams<number>('id', -1, { transform: Number })
console.log(typeof id.value)
const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<ICompanyDTO>>({
  name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }]
})

import { useCompanyStore } from '@/stores/modules/company'
const { getCompany: getCompanyAction, upsertCompany: upsertCompanyAction } = useCompanyStore()
const companyInfo = reactive<ICompanyDTO>({
  name: '',
  description: undefined,
  link: undefined,
  status: ActiveStatus.Inactive,
  partnerType: PartnerTypes.None,
  isShowInFooter: false
})

onMounted(async () => {
  if (id.value > 0) {
    const fetchedNewsDetailData = await getCompanyAction(id.value)
    Object.assign(companyInfo, fetchedNewsDetailData)
  }
})

// 图片相关
import { useSingleImage } from '@/composables/useSingleImage'
const { imageRef, uploadImage } = useSingleImage(computed(() => companyInfo.logoUrl))

// 选项相关
import { activeStatusOptions } from '@/constants/mapData'
import { partnerTypesOptions } from '@/constants/mapData/company'

// 提交
const submit = async () => {
  if (await form.value?.validate()) {
    companyInfo.logoUrl = await uploadImage()
    await upsertCompanyAction(id.value, companyInfo)
    ElMessage.success('提交成功')
    goBack()
  }
}

// 返回
import { useRouterStore } from '@/stores/modules/router'
const { deleteView } = useRouterStore()
const router = useRouter()
const route = useRoute()
const goBack = () => {
  router.push({
    name: 'company'
  })
  deleteView(route)
}
</script>

<style scoped lang="scss">
.company-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
