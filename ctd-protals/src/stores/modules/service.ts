import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', () => {
  const services = ref([
    {
      id: 1,
      title: '数据清洗服务',
      description:
        '数据清洗服务是通过去除错误、重复或不完整的数据来提升数据质量和准确性，帮助企业确保数据的可靠性和有效性。',
      sellingPoints: [
        '提高数据准确性，确保业务决策的可靠性',
        '去除重复和错误数据，优化数据资源',
        '标准化数据格式，提升数据分析效率'
      ],
      imageUrl: 'https://via.placeholder.com/400x400?text=placeholder',
      imagePosition: 'right' as const,
      showBackground: false
    },
    {
      id: 2,
      title: '数据标注服务',
      description:
        '数据标注服务帮助企业为机器学习和AI模型准备高质量的数据集，通过准确的标注提升模型的性能和可靠性。',
      sellingPoints: [
        '提供多种标注类型，适用于不同场景',
        '快速高效的标注流程，节省时间成本',
        '保证数据隐私和安全，确保数据合规'
      ],
      imageUrl: 'https://via.placeholder.com/400x400?text=placeholder',
      imagePosition: 'left' as const,
      showBackground: true
    },
    {
      id: 3,
      title: '数据转换服务',
      description:
        '数据转换服务通过格式转换、数据合并和规范化操作，帮助企业将数据转化为可用的格式和结构。',
      sellingPoints: [
        '支持多种数据格式转换，灵活兼容',
        '自动化数据合并，提高效率',
        '数据规范化，减少错误和冗余'
      ],
      imageUrl: 'https://via.placeholder.com/400x400?text=placeholder',
      imagePosition: 'right' as const,
      showBackground: false
    },
    {
      id: 4,
      title: '数据增强服务',
      description:
        '数据增强服务通过数据扩充和合成，帮助企业丰富数据集，提升模型的泛化能力和准确性。',
      sellingPoints: [
        '增加数据多样性，提升模型鲁棒性',
        '采用先进合成技术，提高数据质量',
        '扩展数据集规模，增强数据丰富性'
      ],
      imageUrl: 'https://via.placeholder.com/400x400?text=placeholder',
      imagePosition: 'left' as const,
      showBackground: true
    }
  ])

  return {
    services
  }
})
