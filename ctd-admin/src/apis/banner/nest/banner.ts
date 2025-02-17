import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { IBannerDTO, IBannerItem } from '@/types/banner'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

export const getBanners = (
  searchQuery: string,
  filters: IFilterDTO<IBannerItem>[],
  sorts: ISort<IBannerItem>[],
  columns: ITableColumnDTO<IBannerItem>[],
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
      url: '/platform/banner/list',
      data
    },
    true
  )
}

export const getBanner = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/platform/banner/${id}`
    },
    true
  )
}

export const upsertBanner = (id: string | number, bannerInfo: IBannerDTO): Promise<unknown> => {
  const data = {
    id,
    ...bannerInfo
  }

  return request.post(
    {
      url: '/platform/banner/upsert',
      data
    },
    true
  )
}

export const changeBannersStatus = (
  ids: (string | number)[],
  status: ActiveStatus
): Promise<unknown> => {
  const data = {
    ids,
    status
  }
  return request.post(
    {
      url: '/platform/banner/change-status',
      data
    },
    true
  )
}

export const deleteBanners = (ids: (string | number)[]): Promise<unknown> => {
  const data = {
    ids
  }
  return request.post(
    {
      url: '/platform/banner/delete',
      data
    },
    true
  )
}
