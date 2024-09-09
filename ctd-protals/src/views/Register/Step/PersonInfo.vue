<template>
  <div flex flex-col>
    <span text-lg font-bold>个人信息</span>
    <el-form
      class="form"
      :model="personalInfo"
      :rules="rules"
      ref="personForm"
      label-width="auto"
      label-position="top"
    >
      <!-- 姓名 -->
      <el-form-item label="姓名" prop="name">
        <el-input v-model="personalInfo.name" placeholder="请输入姓名" />
      </el-form-item>

      <!-- 身份证号 -->
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="personalInfo.idNumber" placeholder="请输入身份证号" />
      </el-form-item>

      <!-- 联系电话 -->
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="personalInfo.phone" placeholder="请输入联系电话" />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别">
        <el-select v-model="personalInfo.gender" placeholder="请选择性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>

      <!-- 出生日期 -->
      <el-form-item label="出生日期">
        <el-date-picker v-model="personalInfo.birthDate" type="date" placeholder="请选择出生日期" />
      </el-form-item>

      <!-- 住址 -->
      <el-form-item label="住址">
        <el-input v-model="personalInfo.address" type="textarea" placeholder="请输入住址" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterStore } from '@/stores/modules/register'
import type { FormInstance, FormRules } from 'element-plus'

// 获取个人信息的 Pinia store
const registerStore = useRegisterStore()

// 绑定 store 的个人信息数据
const personalInfo = registerStore.personalInfo

// 表单实例引用
const personForm = ref<FormInstance | null>(null)

// 表单验证规则
const rules = ref<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  idNumber: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { pattern: /^[1-9]\d{14}(\d{2}[0-9xX])?$/, message: '身份证号格式不正确', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^[1-9]\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
  ]
})

// 定义暴露的验证函数
const validateForm = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (personForm.value) {
      personForm.value.validate((valid) => {
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
