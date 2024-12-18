import * as javaNews from './java/news'
import * as nestNews from './nest/news'

interface INewsAPI {
  getNewsList: (
    pageNum: number,
    pageSize: number,
    searchValue: string,
  ) => Promise<unknown>
  getNews: (id: number | string) => Promise<unknown>
}

type NewsAPIType = INewsAPI

const javaAPI: NewsAPIType = {
  ...javaNews,
}

const nestAPI: NewsAPIType = {
  ...nestNews,
}

const newsAPI: NewsAPIType =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getNewsList, getNews } = newsAPI
