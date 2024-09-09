<template>
  <div flex flex-col>
    <span text-lg font-bold>企业信息</span>
    <el-form
      class="form"
      :model="enterpriseInfo"
      :rules="rules"
      ref="enterpriseForm"
      label-width="auto"
      label-position="top"
    >
      <!-- 企业名称 -->
      <el-form-item label="企业名称*" prop="companyName">
        <el-input v-model="enterpriseInfo.companyName" placeholder="请输入企业名称" />
      </el-form-item>

      <!-- 统一社会信用代码 -->
      <el-form-item label="统一社会信用代码*" prop="companyCode">
        <el-input v-model="enterpriseInfo.companyCode" placeholder="请输入统一社会信用代码" />
      </el-form-item>

      <!-- 联系人姓名 -->
      <el-form-item label="联系人姓名*" prop="contactName">
        <el-input v-model="enterpriseInfo.contactName" placeholder="请输入联系人姓名" />
      </el-form-item>

      <!-- 联系人职位 -->
      <el-form-item label="联系人职位" prop="contactPosition">
        <el-input v-model="enterpriseInfo.contactPosition" placeholder="请输入联系人职位" />
      </el-form-item>

      <!-- 联系人电话 -->
      <el-form-item label="联系人电话*" prop="contactPhone">
        <el-input v-model="enterpriseInfo.contactPhone" placeholder="请输入联系人电话" />
      </el-form-item>

      <!-- 企业地址 -->
      <el-form-item label="企业地址*" prop="companyAddress">
        <el-input v-model="enterpriseInfo.companyAddress" placeholder="请输入企业地址" />
      </el-form-item>

      <!-- 行业类别 -->
      <el-form-item label="行业类别*" prop="industryCategory">
        <el-select v-model="enterpriseInfo.industryCategory" placeholder="请选择行业类别">
          <el-option label="信息技术" value="IT"></el-option>
          <el-option label="制造业" value="Manufacturing"></el-option>
          <el-option label="服务业" value="Services"></el-option>
          <el-option label="金融" value="Finance"></el-option>
          <!-- 其他类别 -->
        </el-select>
      </el-form-item>

      <!-- 企业规模 -->
      <el-form-item label="企业规模" prop="companySize">
        <el-select v-model="enterpriseInfo.companySize" placeholder="请选择企业规模">
          <el-option label="小型企业" value="small"></el-option>
          <el-option label="中型企业" value="medium"></el-option>
          <el-option label="大型企业" value="large"></el-option>
        </el-select>
      </el-form-item>

      <!-- 企业简介 -->
      <el-form-item label="企业简介" prop="companyDescription">
        <el-input
          v-model="enterpriseInfo.companyDescription"
          type="textarea"
          placeholder="请输入企业简介"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterStore } from '@/stores/modules/register'
import type { FormInstance, FormRules } from 'element-plus'

// 获取企业信息的 Pinia store
const registerStore = useRegisterStore()

// 绑定 store 的企业信息数据
const enterpriseInfo = registerStore.enterpriseInfo

// 表单实例引用
const enterpriseForm = ref<FormInstance | null>(null)

// 表单验证规则
const rules = ref<FormRules>({
  companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  companyCode: [
    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
    {
      pattern: /^[A-Z0-9]{18}$/,
      message: '统一社会信用代码格式不正确，必须是18位大写字母或数字',
      trigger: 'blur'
    }
  ],
  contactName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  contactPhone: [
    { required: true, message: '请输入联系人电话', trigger: 'blur' },
    { pattern: /^[1-9]\d{10}$/, message: '联系电话格式不正确', trigger: 'blur' }
  ],
  companyAddress: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
  industryCategory: [{ required: true, message: '请选择行业类别', trigger: 'change' }]
})

// 定义暴露的验证函数
const validateForm = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (enterpriseForm.value) {
      enterpriseForm.value.validate((valid) => {
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
  validateForm
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
