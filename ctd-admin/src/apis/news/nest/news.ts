import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { INewsDTO } from '@/types/news'

export const getNews = (
  searchQuery: string,
  status: string,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    status,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/news/get-list',
      params
    },
    true
  )
}

export const getNewsDetail = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/news/get-detail/${id}`
    },
    true
  )
}

export const upsertNews = (newsInfo: INewsDTO): Promise<unknown> => {
  const data = {
    ...newsInfo
  }

  return request.post(
    {
      url: '/news/upsert',
      data
    },
    true
  )
}

export const changeNewsStatus = (
  ids: (string | number)[],
  status: ActiveStatus
): Promise<unknown> => {
  const data = {
    ids,
    status
  }
  return request.put(
    {
      url: '/news/change-status',
      data
    },
    true
  )
}

export const deleteNews = (ids: (string | number)[]): Promise<unknown> => {
  const params = {
    ids
  }
  return request.delete(
    {
      url: '/news/del',
      params
    },
    true
  )
}
