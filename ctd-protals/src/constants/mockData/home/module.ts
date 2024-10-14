import type { IModule } from '@/types/home'

export const moduleList: IModule[] = [
  {
    id: 1,
    title: '数据交易',
    description:
      '通过数据交易平台，企业和个人可以方便、安全地发布和获取数据，推动数据的共享与流通。这不仅有助于充分发挥数据的商业价值，还能促进各行业的数字化转型与创新发展，为社会创造更多的经济效益和价值。',
    iconUrl: new URL('@/assets/icon/home/module/trade.png', import.meta.url).href
  },
  {
    id: 2,
    title: '数据服务',
    description:
      '通过专业技术和工具，帮助企业和机构有效地整理和优化数据，提升数据的质量和利用效率。通过数据处理服务，用户可以更准确地进行市场分析、预测业务趋势、优化决策过程，从而实现更高的运营效率和竞争优势。',
    iconUrl: new URL('@/assets/icon/home/module/service.png', import.meta.url).href
  },
  {
    id: 3,
    title: '咨询与代办',
    description:
      '致力于为客户提供全方位的数据相关咨询服务与委托代理业务。依托我们丰富的行业资源和专业团队快速、准确地为客户提供信息, 帮助客户深入了解数据的应用场景、挖掘数据价值，助力企业保持竞争优势。',
    iconUrl: new URL('@/assets/icon/home/module/consult.png', import.meta.url).href
  },
  {
    id: 4,
    title: '需求中心',
    description:
      '旨在为企业和个人提供一个高效便捷的数据需求发布和对接平台。我们将利用广泛的行业网络和丰富的数据资源，为用户匹配最合适的数据供应方。同时确保数据需求从沟通到交付的每个环节都能高效、安全地完成。',
    iconUrl: new URL('@/assets/icon/home/module/demand.png', import.meta.url).href
  }
]
