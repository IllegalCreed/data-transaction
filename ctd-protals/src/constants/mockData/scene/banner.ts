import type { IModule } from '@/types/home'

export const banner: IModule = {
  id: 'scene',
  title: '应用场景',
  description:
    '我们致力于汇聚和呈现最优质的文化旅游场景数据产品，为您打造一个了解和体验丰富文旅资源的窗口。无论您是数据开发者、还是文旅从业者或爱好者，都可以在这里发现精彩。加入我们，共同探索文旅数据的无限可能！',
  iconUrl: new URL('@/assets/icon/consult/bannerBackground.png', import.meta.url).href
}
