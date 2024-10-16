import type { IModule } from '@/types/home'

export const banner: IModule = {
  id: 'consult',
  title: '咨询与代办',
  description:
    '致力于为客户提供全方位的数据相关咨询服务与委托代理业务。依托我们丰富的行业资源和专业团队快速、准确地为客户提供信息。帮助客户深入了解数据的应用场景、挖掘数据价值，助力企业保持竞争优势。',
  iconUrl: new URL('@/assets/icon/consult/bannerBackground.png', import.meta.url).href
}
