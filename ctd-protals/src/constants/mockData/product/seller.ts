import type { ISeller } from '@/types/seller'

export const sellers: ISeller[] = [
  {
    id: 1,
    title: '智能科技有限公司',
    avatar: new URL('@/assets/mock/partnerLogo.png', import.meta.url).href,
    tags: ['五星商家', '企业', '1万保证金', '生态创新Top10'],
    content: `
      <p>智能科技有限公司是一家专注于大数据和人工智能领域的创新企业，致力于为客户提供高效的解决方案。</p>
      <img src="https://via.placeholder.com/600x400" alt="关于商家的图片" style="width:100%">
      <p>公司成立于2010年，已累计服务超过1000家企业，覆盖多个行业，包括金融、医疗、零售等。</p>
    `,
    stats: [
      { title: '评分', value: '4.9/5' },
      { title: '成交量', value: '1500+' },
      { title: '入驻时间', value: '5年' },
      { title: '服务完成率', value: '98%' }
    ]
  }
]
