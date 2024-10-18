import type { IRegisterAdCarouselItem } from '@/types/advertisement'

export const ads: IRegisterAdCarouselItem[] = [
  {
    id: 1,
    title: '成为产品供应商',
    comment:
      '作为产品供应商，您可以通过平台提供优质的数据产品，帮助更多企业和用户解决数据需求，充分发挥数据资源的商业价值。',
    imageUrl: new URL('@/assets/icon/register/1.png', import.meta.url).href
  },
  {
    id: 2,
    title: '成为需求承接商',
    comment:
      '需求承接商通过承接平台上的各类数据需求，提供相应的技术或服务支持，帮助企业高效完成数据项目，获得丰厚回报。',
    imageUrl: new URL('@/assets/icon/register/2.png', import.meta.url).href
  },
  {
    id: 3,
    title: '成为数据处理服务商',
    comment:
      '作为数据处理服务商，您可以利用先进的技术帮助企业进行数据清洗、分析、挖掘等处理服务，提升数据的使用价值和效率。',
    imageUrl: new URL('@/assets/icon/register/3.png', import.meta.url).href
  },
  {
    id: 4,
    title: '成为数据服务消费者',
    comment:
      '数据服务消费者可以通过平台获取优质的数据资源和服务，满足企业业务发展的多样化数据需求，推动数字化转型。',
    imageUrl: new URL('@/assets/icon/register/4.png', import.meta.url).href
  }
]
