import type { ActiveStatus } from '@/constants/mapData'
import * as javaNews from './java/news'
import * as nestNews from './nest/news'
import type { INewsDTO } from '@/types/news'

interface INewsAPI {
  getNews: (
    searchQuery: string,
    status: string,
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getNewsDetail: (id: string | number) => Promise<unknown>
  upsertNews: (id: string | number, newsInfo: INewsDTO) => Promise<unknown>
  changeNewsStatus: (ids: (string | number)[], status: ActiveStatus) => Promise<unknown>
  deleteNews: (ids: (string | number)[]) => Promise<unknown>
}

type NewsAPIType = INewsAPI

const javaAPI: NewsAPIType = {
  ...javaNews
}

const nestAPI: NewsAPIType = {
  ...nestNews
}

const newsAPI: NewsAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getNews, getNewsDetail, upsertNews, changeNewsStatus, deleteNews } = newsAPI
