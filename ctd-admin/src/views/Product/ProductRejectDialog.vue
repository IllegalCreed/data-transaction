<template>
  <el-dialog v-model="model" title="驳回" width="500" :close-on-click-modal="false">
    <div flex flex-col gap-4>
      <div grid class="grid-cols-[100px_1fr]" gap-4>
        <span>驳回原因：</span>
        <el-input
          v-model="reason"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入"
        />
        <span>上传附件：</span>
        <el-upload
          ref="uploadRef"
          v-model:file-list="fileList"
          action=""
          multiple
          :auto-upload="false"
        >
          <el-button type="primary">选择文件</el-button>
        </el-upload>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="model = false">取消</el-button>
        <el-button type="primary" @click="handleReject"> 驳回 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { UploadUserFile } from 'element-plus'

defineProps<{ id: string | number }>()
const model = defineModel<boolean>()
watch(model, (val) => {
  if (val) {
    reason.value = ''
    fileList.value = []
  }
})

const uploadRef = useTemplateRef('uploadRef')
const reason = ref('')
const fileList = ref<UploadUserFile[]>([])

const handleReject = () => {
  uploadRef.value!.submit()
  model.value = false
}
</script>

<style scoped lang="scss"></style>
