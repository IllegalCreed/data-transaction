import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { INewsDTO } from '@/types/news'

export const getNews = (
  searchQuery: string,
  status: ActiveStatus,
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
      url: '/news',
      params
    },
    true
  )
}

export const getNewsDetail = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/news/${id}`
    },
    true
  )
}

export const upsertNews = (id: string | number, newsInfo: INewsDTO): Promise<unknown> => {
  const data = {
    id,
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
  const params = {
    ids,
    status
  }
  return request.put(
    {
      url: '/news/change-status',
      params
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
      url: '/news/delete',
      params
    },
    true
  )
}
