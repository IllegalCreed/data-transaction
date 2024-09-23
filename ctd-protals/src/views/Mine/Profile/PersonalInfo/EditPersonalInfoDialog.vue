<template>
  <el-dialog
    class="edit-personal-dialog-container"
    v-model="model"
    :lock-scroll="true"
    :close-on-click-modal="false"
    title="修改密码"
  >
    <div>
      <el-form
        class="form"
        :model="personalInfo"
        :rules="rules"
        ref="personForm"
        label-width="auto"
        label-position="top"
        max-w-100
      >
        <!-- 头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="personalInfo.avatar" :src="personalInfo.avatar" w-40 h-40 object-contain />
            <div v-else class="avatar-uploader-icon">
              <i-lets-icons:upload w-10 h-10></i-lets-icons:upload>
            </div>
          </el-upload>
        </el-form-item>

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
          <el-date-picker
            v-model="personalInfo.birthDate"
            type="date"
            placeholder="请选择出生日期"
          />
        </el-form-item>

        <!-- 住址 -->
        <el-form-item label="住址">
          <el-input v-model="personalInfo.address" type="textarea" placeholder="请输入住址" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="btn" @click="model = false">取消</el-button>
        <el-button class="btn" type="primary" @click="handleSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'

const model = defineModel<boolean>({ required: true })

const personalInfo = reactive({
  name: '',
  idNumber: '',
  phone: '',
  gender: '',
  birthDate: '',
  address: '',
  avatar: ''
})

const personForm = ref<FormInstance | null>(null)

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

async function handleSubmit() {
  if (!personForm.value) return
  await personForm.value.validate((valid) => {
    if (valid) {
      ElMessage.success('个人信息修改成功')
      model.value = false
    }
  })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
  const isAllowedType = allowedTypes.includes(rawFile.type)
  if (!isAllowedType) {
    ElMessage.error('头像图片必须是 JPG、PNG、GIF、BMP 或 WEBP 格式！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片大小不能超过 2MB！')
    return false
  }
  const reader = new FileReader()
  reader.readAsDataURL(rawFile)
  reader.onload = () => {
    personalInfo.avatar = reader.result as string
  }

  return false // 阻止自动上传
}
</script>

<style lang="scss" scoped>
:global(.edit-personal-dialog-container) {
  @apply flex flex-col min-w-140;

  @media (max-width: 40rem) {
    @apply min-w-80 fixed left-0 right-0 top-auto bottom-0 mb-0 w-full h-80%;
  }
}

:global(.edit-personal-dialog-container .el-dialog__body) {
  @apply flex flex-col flex-1 min-h-0 overflow-y-auto;
}

.dialog-footer {
  @apply flex flex-row items-center justify-end;

  @media (max-width: 40rem) {
    .btn {
      @apply flex-1;
    }
  }
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  @apply w-40 h-40 flex items-center justify-center;
}
</style>
