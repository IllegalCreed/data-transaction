import type { ActiveStatus } from '@/constants/mapData'
import * as javaNews from './java/news'
import * as nestNews from './nest/news'
import type { INewsDTO, INewsItem } from '@/types/news'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

interface INewsAPI {
  getNewsList: (
    searchQuery: string,
    filters: IFilterDTO<INewsItem>[],
    sorts: ISort<INewsItem>[],
    columns: ITableColumnDTO<INewsItem>[],
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getNewsDetail: (id: string | number) => Promise<unknown>
  upsertNews: (id: string | number, newsInfo: INewsDTO) => Promise<unknown>
  changeNewsStatus: (ids: (string | number)[], status: ActiveStatus) => Promise<unknown>
  deleteNews: (ids: (string | number)[]) => Promise<unknown>
  getNewsOptionsByTitle: (searchQuery: string) => Promise<unknown>
  getNewsOptionsByID: (id: string | number) => Promise<unknown>
}

type NewsAPIType = INewsAPI

const javaAPI: NewsAPIType = {
  ...javaNews
}

const nestAPI: NewsAPIType = {
  ...nestNews
}

const newsAPI: NewsAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  getNewsList,
  getNewsDetail,
  upsertNews,
  changeNewsStatus,
  deleteNews,
  getNewsOptionsByTitle,
  getNewsOptionsByID
} = newsAPI
