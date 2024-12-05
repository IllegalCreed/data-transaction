<template>
  <div class="company-edit-root-container">
    <span class="panel-title">{{ id === '-1' ? '新建公司' : '编辑公司' }}</span>
    <el-form
      @submit.prevent
      :model="companyInfo"
      :rules="rules"
      ref="form"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="公司标题" prop="name" max-w-120>
        <el-input v-model="companyInfo.name" placeholder="请输入" :validate-event="false" />
      </el-form-item>
      <el-form-item label="公司简介：" prop="description" max-w-120>
        <el-input
          v-model="companyInfo.description"
          placeholder="请输入"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          :validate-event="false"
        />
      </el-form-item>
      <el-form-item label="公司链接" prop="link" max-w-120>
        <el-input v-model="companyInfo.link" placeholder="请输入" :validate-event="false" />
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
        <image-picker v-model="logoImage" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagePicker from '@/components/ImagePicker.vue'
import { v4 as uuidv4 } from 'uuid'
import { type FormInstance, type FormRules } from 'element-plus'
import type { ICompanyDTO } from '@/types/company'
import { PartnerTypes } from '@/constants/mapData/company'

const id = useRouteParams<string>('id')
const form = useTemplateRef<FormInstance>('form')
const rules = reactive<FormRules<ICompanyDTO>>({
  name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入公司简介', trigger: 'blur' }],
  link: [{ required: true, message: '请输入公司链接', trigger: 'blur' }]
})

import { useCompanyStore } from '@/stores/modules/company'
const { getCompany: getCompanyAction, upsertCompany: upsertCompanyAction } = useCompanyStore()
const companyInfo = reactive<ICompanyDTO>({
  name: '',
  description: '',
  link: '',
  status: ActiveStatus.Inactive,
  partnerType: PartnerTypes.None,
  isShowInFooter: false
})

onMounted(async () => {
  if (id.value !== '-1') {
    const fetchedNewsDetailData = await getCompanyAction(id.value)
    Object.assign(companyInfo, fetchedNewsDetailData)
    if (companyInfo.logoUrl) {
      logoImage.value = {
        id: uuidv4(),
        url: companyInfo.logoUrl,
        name: companyInfo.logoUrl,
        raw: undefined
      }
    }
  }
})

// 图片相关
const logoImage = ref<IUploadFile>()

import { useFileStore } from '@/stores/modules/file'
import { ActiveStatus } from '@/constants/mapData'
import type { IUploadFile } from '@/types/common'
const { uploadFile: uploadFileAction } = useFileStore()
const uploadImage = async () => {
  if (logoImage.value) {
    if (logoImage.value.raw) {
      const url = await uploadFileAction(logoImage.value.raw)
      logoImage.value.url = url
      logoImage.value.name = url
      logoImage.value.raw = undefined
      companyInfo.logoUrl = url
    }
  }
}

import { activeStatusOptions } from '@/constants/mapData'
import { partnerTypesOptions } from '@/constants/mapData/company'

const submit = async () => {
  if (await form.value?.validate()) {
    await uploadImage()
    await upsertCompanyAction(id.value, companyInfo)
  }
}
</script>

<style scoped lang="scss">
.company-edit-root-container {
  @apply flex-1 flex flex-col p-4 gap-4 bg-[var(--background-page-color)];
}
</style>
