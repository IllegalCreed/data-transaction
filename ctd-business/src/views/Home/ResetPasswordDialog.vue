<template>
  <el-dialog v-model="model" title="修改密码" :width="500" :lock-scroll="false">
    <el-form :model="userPwd" :rules="rules" ref="formRef" label-width="auto" style="width: 400px">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="userPwd.oldPwd" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="userPwd.newPwd" type="password" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="重复密码" prop="repeatPwd">
        <el-input v-model="userPwd.repeatPwd" type="password" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="model = false">取消</el-button>
        <el-button type="primary" @click="handleResetPwd"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useAccountStore } from '@/stores/modules/account'
import { successMessage } from '@/utils/messageBox'

const { resetPwd } = useAccountStore()

const model = defineModel<boolean>({ required: true })

const userPwd = ref({
  oldPwd: '',
  newPwd: '',
  repeatPwd: ''
})

const formRef = ref<FormInstance>()
const validateNewPwd = (rule: any, value: any, callback: any) => {
  const regex =
    /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,20}$/
  if (!regex.test(userPwd.value.newPwd)) {
    callback(new Error('密码必须大于8位，且至少包含大小写字母数字及特殊字符'))
  } else {
    callback()
  }
}

const validateRepeatPwd = (rule: any, value: any, callback: any) => {
  if (userPwd.value.newPwd !== userPwd.value.repeatPwd) {
    callback(new Error('请保证两次输入的密码一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<any>>({
  oldPwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  newPwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { validator: validateNewPwd, trigger: 'blur' }
  ],
  repeatPwd: [
    { required: true, message: '重复密码不能为空', trigger: 'blur' },
    { validator: validateRepeatPwd, trigger: 'blur' }
  ]
})

async function handleResetPwd() {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      resetPwd(userPwd.value.oldPwd, userPwd.value.newPwd).then(() => {
        successMessage('保存')
        model.value = false
      })
    }
  })
}
</script>

<style scoped lang="scss">
.setting-item {
  @apply flex flex-row items-center justify-between mb-4;
}
</style>
