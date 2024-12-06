<template>
  <div>
    <quill-editor
      v-model:content="modal"
      theme="snow"
      :toolbar="toolbar"
      w-full
      max-w-200
    ></quill-editor>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const modal = defineModel<string>()

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
</script>

<style scoped lang="scss">
:deep(.ql-toolbar) {
  @apply w-full max-w-200 sticky top--5 bg-[var(--background-page-color)] z-10;
}

:deep(.ql-editor) {
  @apply min-h-100;
}
</style>
