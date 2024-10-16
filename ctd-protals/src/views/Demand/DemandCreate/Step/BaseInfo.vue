<template>
  <div flex flex-col>
    <span text-2xl font-bold>请您填写基本信息</span>
    <el-form
      class="form"
      :model="baseInfo"
      :rules="rules"
      ref="baseForm"
      label-width="auto"
      label-position="top"
    >
      <el-form-item label="需求名称" prop="title">
        <el-input v-model="baseInfo.title" class="!w-80" />
      </el-form-item>

      <el-form-item label="预计完成日期" prop="completionTime">
        <el-date-picker v-model="baseInfo.completionTime" type="date" class="!w-80" />
      </el-form-item>

      <el-form-item label="需求描述" prop="desc">
        <el-input v-model="baseInfo.desc" :rows="5" type="textarea" max-w-200 />
      </el-form-item>

      <el-form-item label="需求详情" prop="detail">
        <quill-editor
          class="editor"
          v-model:content="baseInfo.detail"
          theme="snow"
          :toolbar="toolbar"
          w-full
          max-w-200
        ></quill-editor>
      </el-form-item>
    </el-form>

    <el-button class="step-btn" type="primary" @click="handleNextStep">下一步</el-button>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useDemandStore } from '@/stores/modules/demand'
const demandStore = useDemandStore()
const { baseInfo } = demandStore

const rules = reactive<FormRules<any>>({
  title: [{ required: true, message: '请输入需求名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入需求描述', trigger: 'blur' }]
})

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'video', 'image'],

  ['clean']
]

const baseForm = useTemplateRef<FormInstance>('baseForm')
const validateOnSubmit = false
const handleSubmit = async (): Promise<boolean> => {
  if (!baseForm.value) return Promise.resolve(false)

  const baseFormValid = await new Promise<boolean>((resolve) => {
    baseForm.value?.validate((valid) => {
      resolve(valid)
    })
  })

  if (!baseFormValid) return Promise.resolve(false)

  return Promise.resolve(true)
}

const emit = defineEmits(['nextStep'])
const handleNextStep = async () => {
  if (validateOnSubmit) {
    if (await handleSubmit()) {
      emit('nextStep')
    } else {
      ElMessage.error('请检查填写的信息是否正确')
    }
  } else {
    emit('nextStep')
  }
}
</script>

<style lang="scss" scoped>
.form {
  @apply mt-10;
}

:deep(.ql-toolbar) {
  @apply w-full max-w-200 sticky top--10 bg-white z-10;

  @media (max-width: 40rem) {
    @apply top--5;
  }
}

:deep(.ql-editor) {
  @apply min-h-100;
}

.step-btn {
  @apply w-30 mb-10;

  @media (max-width: 40rem) {
    @apply self-center w-80 ml-0 mt-10;
  }

  @media (max-width: 30rem) {
    @apply w-70;
  }
}
</style>
