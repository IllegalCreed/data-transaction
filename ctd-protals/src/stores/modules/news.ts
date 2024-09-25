import type { INews } from '@/types/news'
import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', () => {
  const newsList = ref<INews[]>([
    {
      id: 1,
      title: '最新科技动态',
      summary:
        '探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。探索最新的科技创新和趋势。',
      content: `
        <p>在这篇文章中，我们将探讨最新的科技动态，包括人工智能、区块链等。</p>
        <img src="https://via.placeholder.com/300" alt="科技动态" />
        <p>随着科技的不断发展，许多新兴技术正在改变我们的生活。</p>
        <h3>人工智能的应用</h3>
        <p>人工智能正在各个行业中发挥着重要作用，从医疗到金融。</p>
        <p>点击上面的链接，了解更多关于人工智能的最新动态。</p>
      `,
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 2,
      title: '市场营销策略',
      summary: '有效的市场营销策略对企业至关重要。',
      content: '<p>本文介绍了一些成功的市场营销策略，包括数字营销和内容营销。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 3,
      title: '健康生活方式',
      summary: '如何保持健康的生活方式。',
      content: '<p>本文提供了保持健康生活方式的一些建议，包括饮食和锻炼。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 4,
      title: '经济发展趋势',
      summary: '分析当前经济发展的趋势。',
      content: '<p>本文章分析了当前经济发展的趋势及其影响。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 5,
      title: '旅行目的地推荐',
      summary: '推荐一些值得一去的旅行目的地。',
      content: '<p>本文推荐了一些令人兴奋的旅行目的地，适合各种旅行者。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 6,
      title: '职场发展建议',
      summary: '如何在职场中取得成功。',
      content: '<p>本文分享了一些职场发展的建议，帮助你在职业生涯中取得进步。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 7,
      title: '教育改革动态',
      summary: '探讨教育改革的新动态。',
      content: '<p>本文讨论了当前教育改革的新动态及其影响。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 8,
      title: '环保与可持续发展',
      summary: '关注环保与可持续发展的重要性。',
      content: '<p>本文探讨了环保与可持续发展的重要性及其措施。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 9,
      title: '个人理财技巧',
      summary: '提高个人理财能力的技巧。',
      content: '<p>本文提供了一些个人理财技巧，帮助你更好地管理财务。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    },
    {
      id: 10,
      title: '科技与未来',
      summary: '科技如何塑造我们的未来。',
      content: '<p>本文探讨了科技如何改变我们的未来，特别是在生活和工作中。</p>',
      image: 'https://via.placeholder.com/300',
      createTime: '2024-09-25'
    }
  ])

  return {
    newsList
  }
})
