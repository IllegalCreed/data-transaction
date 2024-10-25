<template>
  <div flex flex-col>
    <span text-lg font-bold>企业信息</span>
    <el-form
      @submit.prevent
      class="form"
      :model="enterpriseInfo"
      :rules="rules"
      ref="enterpriseForm"
      label-width="auto"
      label-position="top"
    >
      <!-- 企业名称 -->
      <el-form-item label="企业名称*" prop="enterpriseName">
        <el-input
          data-testid="companyName-input"
          v-model="enterpriseInfo.enterpriseName"
          placeholder="请输入企业名称"
        />
      </el-form-item>

      <!-- 统一社会信用代码 -->
      <el-form-item label="统一社会信用代码*" prop="registrationNumber">
        <el-input
          data-testid="companyCode-input"
          v-model="enterpriseInfo.registrationNumber"
          placeholder="请输入统一社会信用代码"
        />
      </el-form-item>

      <!-- 联系人姓名 -->
      <el-form-item label="联系人姓名*" prop="contactPersonName">
        <el-input
          data-testid="contactName-input"
          v-model="enterpriseInfo.contactPersonName"
          placeholder="请输入联系人姓名"
        />
      </el-form-item>

      <!-- 联系人职位 -->
      <el-form-item label="联系人职位" prop="contactPersonTitle">
        <el-input
          data-testid="contactPosition-input"
          v-model="enterpriseInfo.contactPersonTitle"
          placeholder="请输入联系人职位"
        />
      </el-form-item>

      <!-- 联系人电话 -->
      <el-form-item label="联系人电话*" prop="contactPhoneNumber">
        <el-input
          data-testid="contactPhone-input"
          v-model="enterpriseInfo.contactPhoneNumber"
          placeholder="请输入联系人电话"
        />
      </el-form-item>

      <!-- 企业地址 -->
      <el-form-item label="企业地址*" prop="enterpriseAddress">
        <el-input
          data-testid="companyAddress-input"
          v-model="enterpriseInfo.enterpriseAddress"
          placeholder="请输入企业地址"
        />
      </el-form-item>

      <!-- 行业类别 -->
      <el-form-item label="行业类别*" prop="industryType">
        <el-select
          data-testid="industryCategory-select"
          v-model="enterpriseInfo.industryType"
          placeholder="请选择行业类别"
        >
          <el-option
            data-testid="industryCategory-option-IT"
            label="信息技术"
            value="信息技术"
          ></el-option>
          <el-option label="制造业" value="制造业"></el-option>
          <el-option label="服务业" value="服务业"></el-option>
          <el-option label="金融" value="金融"></el-option>
          <!-- 其他类别 -->
        </el-select>
      </el-form-item>

      <!-- 企业规模 -->
      <el-form-item label="企业规模" prop="numberOfEmployees">
        <el-select
          data-testid="companySize-select"
          v-model="enterpriseInfo.numberOfEmployees"
          placeholder="请选择企业规模"
        >
          <el-option
            data-testid="companySize-option-large"
            label="小型企业"
            value="小型企业"
          ></el-option>
          <el-option label="中型企业" value="中型企业"></el-option>
          <el-option label="大型企业" value="大型企业"></el-option>
        </el-select>
      </el-form-item>

      <!-- 企业简介 -->
      <el-form-item label="企业简介" prop="enterpriseDescription">
        <el-input
          data-testid="companyDescription-input"
          v-model="enterpriseInfo.enterpriseDescription"
          type="textarea"
          placeholder="请输入企业简介"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore } from '@/stores/modules/account'
import type { FormInstance, FormRules } from 'element-plus'

// 获取企业信息的 Pinia store
const accountStore = useAccountStore()

// 绑定 store 的企业信息数据
const enterpriseInfo = accountStore.enterpriseInfo

// 表单实例引用
const enterpriseForm = ref<FormInstance | null>(null)

// 表单验证规则
const rules = ref<FormRules>({
  enterpriseName: [
    { required: true, message: '请输入企业名称', trigger: 'blur' },
  ],
  registrationNumber: [
    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
    {
      pattern: /^[A-Z0-9]{18}$/,
      message: '统一社会信用代码格式不正确，必须是18位大写字母或数字',
      trigger: 'blur',
    },
  ],
  contactPersonName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
  ],
  contactPhoneNumber: [
    { required: true, message: '请输入联系人电话', trigger: 'blur' },
    {
      pattern: /^[1-9]\d{10}$/,
      message: '联系电话格式不正确',
      trigger: 'blur',
    },
  ],
  enterpriseAddress: [
    { required: true, message: '请输入企业地址', trigger: 'blur' },
  ],
  industryType: [
    { required: true, message: '请选择行业类别', trigger: 'change' },
  ],
})

// 定义暴露的验证函数
const validateForm = (): Promise<boolean> => {
  return new Promise(resolve => {
    if (enterpriseForm.value) {
      enterpriseForm.value.validate(valid => {
        if (valid) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })
}

// 使用 defineExpose 暴露验证函数给父组件
defineExpose({
  validateForm,
})
</script>

<style lang="scss" scoped>
.form {
  @apply w-80 mt-4;

  @media (max-width: 30rem) {
    @apply w-70;
  }
}
</style>
