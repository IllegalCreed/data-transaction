<template>
  <div flex flex-col>
    <div v-html="demandDetails" overflow-hidden></div>

    <div mt-10>
      <h2>附件列表</h2>
      <div flex flex-row flex-wrap>
        <a
          v-for="(attachment, index) in attachments"
          :key="index"
          :href="attachment.url"
          download
          flex
          flex-col
          items-center
          p-4
          rounded-2xl
          hover:bg-gray-100
        >
          <img :src="getFileIcon(attachment.name)" h-10 w-10 mb-4 />
          <span text-sm max-w-30 line-clamp-1>{{ attachment.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

const props = defineProps<{
  demandId: string
}>()

const demandDetails = ref<string | null>(null)
const attachments = ref<Array<{ name: string; url: string }>>([])

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'pdf':
      return 'https://cdn-icons-png.flaticon.com/512/337/337946.png' // PDF 图标
    case 'doc':
    case 'docx':
      return 'https://cdn-icons-png.flaticon.com/512/337/337932.png' // Word 文档图标
    case 'xls':
    case 'xlsx':
      return 'https://cdn-icons-png.flaticon.com/512/337/337946.png' // Excel 文档图标
    case 'ppt':
    case 'pptx':
      return 'https://cdn-icons-png.flaticon.com/512/337/337949.png' // PPT 文档图标
    case 'txt':
      return 'https://cdn-icons-png.flaticon.com/512/136/136538.png' // 文本文件图标
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'https://cdn-icons-png.flaticon.com/512/136/136524.png' // 图片文件图标
    default:
      return 'https://cdn-icons-png.flaticon.com/512/136/136544.png' // 通用文件图标
  }
}

const fetchDemandDetails = async (id: string) => {
  console.log('mock get DemandDetails for DemandId:', id)
  const rawContent = `
  <h2>项目背景</h2>
    <p>我们正在寻求一个专业开发团队来建立一个具有以下特点的企业级网站：</p>
    <ul>
      <li>高性能，能够支持大规模用户访问</li>
      <li>现代化设计，符合当前用户体验标准</li>
      <li>可扩展性强，能够随着业务增长快速扩展功能</li>
      <li>需要集成第三方服务，例如支付网关和CRM系统</li>
    </ul>
    <p>我们的目标是打造一个不仅仅是展示信息的平台，而是一个可以有效提升客户体验和公司运营效率的工具。</p>
  `
  demandDetails.value = DOMPurify.sanitize(rawContent)

  const mockAttachments = [
    { name: '项目需求文档.pdf', url: 'https://example.com/files/需求文档.pdf' },
    { name: '技术规格说明.docx', url: 'https://example.com/files/技术规格说明.docx' },
    { name: '设计草图.zip', url: 'https://example.com/files/设计草图.zip' }
  ]

  attachments.value = mockAttachments
}

onMounted(() => {
  fetchDemandDetails(props.demandId)
})
</script>

<style lang="scss" scoped></style>
