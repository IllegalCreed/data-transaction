import type { ILoginAd } from '@/types/advertisement'
import type { IAuthLink } from '@/types/login'
import { v4 as uuidv4 } from 'uuid'

export const ads: ILoginAd = {
  title: '北京市\n文旅数据专区平台',
  desc: '平台旨在整合北京市的文化和旅游数据资源，通过数据交易、数据处理服务、咨询与待办以及需求发布等功能，为企业和公众提供便捷的服务，助力北京市文旅产业的转型与高质量发展。',
  carousels: [
    {
      id: uuidv4(),
      title: '数据交易功能',
      name: '流云漫步',
      comment:
        '自从使用了这个平台的“数据交易”功能，我们公司大大提高了数据共享和流通的效率，节省了不少时间和成本。平台界面友好，操作简单，让我们能够快速上手。非常推荐其他公司也使用这个功能！',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: uuidv4(),
      title: '数据处理服务',
      name: '远行者',
      comment:
        '平台提供的“数据处理服务”真的很棒！我们原本有一批杂乱无章的数据，在平台上进行处理后，数据变得整洁且高效。这项服务帮助我们更准确地预测市场趋势，优化了公司的决策过程。',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: uuidv4(),
      title: '咨询与代办服务',
      name: '无言之诗',
      comment:
        '我对平台提供的“咨询与代办服务”非常满意！工作人员专业且细心，他们的建议帮助我们公司顺利通过了数据合规审核。整个过程高效且透明，我觉得这是我们合作过的最好的一次体验。',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: uuidv4(),
      title: '需求中心',
      name: '守望',
      comment:
        '使用平台的“需求中心”发布数据需求后，没想到很快就得到了响应，并匹配到了合适的供应商。整个沟通过程非常顺畅。总的来说，这是一个非常值得信赖的平台。',
      avatar: 'https://via.placeholder.com/50'
    }
  ]
}

export const oauthLinks: IAuthLink[] = [
  {
    icon: new URL('@/assets/icon/login/alipay.png', import.meta.url).href,
    url: 'https://example.com/oauth2/weixin'
  },
  {
    icon: new URL('@/assets/icon/login/QQ.png', import.meta.url).href,
    url: 'https://example.com/oauth2/qq'
  },
  {
    icon: new URL('@/assets/icon/login/wechat.png', import.meta.url).href,
    url: 'https://example.com/oauth2/alipay'
  }
]
