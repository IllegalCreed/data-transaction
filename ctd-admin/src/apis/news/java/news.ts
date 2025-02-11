import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { INewsDTO, INewsItem } from '@/types/news'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const getNewsList = (
  searchQuery: string,
  filters: IFilterDTO<INewsItem>[],
  sorts: ISort<INewsItem>[],
  columns: ITableColumnDTO<INewsItem>[],
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const data = {
    searchQuery,
    filters,
    sorts,
    columns,
    pageNum,
    pageSize
  }
  return request.post(
    {
      url: '/platform/news/list',
      data
    },
    true
  )
}

export const getNewsDetail = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/platform/news/${id}`
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
      url: '/platform/news/upsert',
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
  return request.post(
    {
      url: '/platform/news/change-status',
      data
    },
    true
  )
}

export const deleteNews = (ids: (string | number)[]): Promise<unknown> => {
  const data = {
    ids
  }
  return request.post(
    {
      url: '/platform/news/delete',
      data
    },
    true
  )
}

export const getNewsOptionsByTitle = (name: string): Promise<unknown> => {
  const params = {
    name
  }
  return request.get(
    {
      url: '/platform/news/get-options-by-title',
      params
    },
    true
  )
}

export const getNewsOptionsByID = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.get(
    {
      url: '/platform/news/get-options-by-id',
      params
    },
    true
  )
}
