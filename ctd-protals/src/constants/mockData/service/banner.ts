import type { IModule } from '@/types/home'

export const banner: IModule = {
  id: 'service',
  title: '数据服务',
  description:
    '为了满足企业的需求，我们提供了一系列数据处理服务，包括数据清洗、数据集成、数据建模、数据可视化等。我们的团队拥有丰富的经验和技术能力，能够帮助企业实现数据驱动的决策和业务增长。',
  iconUrl: new URL('@/assets/icon/service/bannerBackground.png', import.meta.url).href
}
