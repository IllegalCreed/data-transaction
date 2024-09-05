<template>
  <div class="footer-root-container">
    <div class="footer-link-container">
      <div class="responsive-container">
        <div flex flex-col w-60>
          <span class="link-title">友情链接</span>
          <a class="link-item" v-for="item of friendLinks" :key="item.id" :href="item.link">{{
            item.label
          }}</a>
        </div>
        <div flex flex-col w-40>
          <span class="link-title">关于</span>
          <a class="link-item" v-for="item of aboutLinks" :key="item.id" :href="item.link">{{
            item.label
          }}</a>
        </div>
        <div flex flex-col w-50>
          <span class="link-title">联系我们</span>
          <div flex flex-row>
            <i-mdi:map-marker class="link-icon" />
            <span class="link-item">北京市海淀区中关村大街100号</span>
          </div>
          <div flex flex-row>
            <i-mdi:email class="link-icon" />
            <a class="link-item" href="mailto:EMAIL">123123123@123.com</a>
          </div>
          <div flex flex-row>
            <i-mdi:phone class="link-icon" />
            <a class="link-item" href="tel:+1234567890">+1234567890</a>
          </div>
        </div>
        <div flex flex-col>
          <i-ic:baseline-wechat class="qrcode" />
          <img src="https://via.placeholder.com/200x200?text=QRCode" />
        </div>
      </div>
    </div>
    <div class="filings-root-container">
      <div flex flex-row flex-wrap space-x-10>
        <span>经营许可证：京B2-20080224</span>
        <span>ICP备案号：1234567890</span>
      </div>
      <span text-lg>© 2024-现在 北投智慧 版权所有 </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const friendLinks = [
  {
    id: 1,
    label: 'DataSphere 维度数据',
    link: 'https://www.datasphere.com'
  },
  {
    id: 2,
    label: '云端智能分析',
    link: 'https://www.smartcloudanalytics.com'
  },
  {
    id: 3,
    label: 'DataStream 数据流',
    link: 'https://www.datastream.io'
  },
  {
    id: 4,
    label: 'AI Insight 智能洞察',
    link: 'https://www.ai-insight.cn'
  },
  {
    id: 5,
    label: 'CloudData 云数据服务',
    link: 'https://www.clouddata-service.com'
  },
  {
    id: 6,
    label: '数研科技',
    link: 'https://www.shuyankeji.cn'
  },
  {
    id: 7,
    label: 'BigData Solutions',
    link: 'https://www.bigdatasolutions.net'
  },
  {
    id: 8,
    label: 'DataLink 数据链接',
    link: 'https://www.datalink.co'
  }
]
const aboutLinks = [
  {
    id: 1,
    label: '隐私政策',
    link: 'https://www.example.com/privacy-policy'
  },
  {
    id: 2,
    label: '建议反馈',
    link: 'https://www.example.com/feedback'
  },
  {
    id: 3,
    label: '法律声明',
    link: 'https://www.example.com/legal-disclaimer'
  },
  {
    id: 4,
    label: '知识产权',
    link: 'https://www.example.com/intellectual-property'
  },
  {
    id: 5,
    label: '关于平台',
    link: 'https://www.example.com/about-platform'
  },
  {
    id: 6,
    label: '招聘信息',
    link: 'https://www.example.com/careers'
  }
]
</script>

<style scoped lang="scss">
.footer-root-container {
  @apply flex flex-col mt-20;

  .footer-link-container {
    @apply flex justify-center items-center min-w-full bg-blueGray min-h-100;
  }

  .responsive-container {
    @apply flex flex-row space-x-10;
  }

  .link-title {
    @apply text-2xl font-bold mb-3;
  }

  .link-item {
    @apply my-1 text-base text-gray-700 no-underline hover:underline break-all;
  }

  .link-icon {
    @apply flex-shrink-0 my-2 w-4 h-4 text-gray-700 mr-4;
  }

  .qrcode {
    @apply mt-12.5 mb-4;
  }

  @media (max-width: 75rem) {
    .responsive-container {
      @apply grid grid-cols-2 gap-10 space-x-0 py-20;
    }
  }

  @media (max-width: 40rem) {
    .responsive-container {
      @apply grid grid-cols-1 gap-10 space-x-0 py-20;
    }

    .qrcode {
      @apply mt-0;
    }
  }
}

.filings-root-container {
  @apply flex justify-between items-center h-10 px-20 bg-dark text-white;

  @media (max-width: 75rem) {
    @apply h-20;

    div {
      @apply flex flex-col space-x-0;
    }
  }

  @media (max-width: 40rem) {
    @apply flex flex-col h-auto py-8 space-y-4;

    div {
      @apply flex flex-col space-x-0 space-y-2;
    }
  }
}
</style>
