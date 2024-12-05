import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { LinkTypes } from '@/constants/mapData/banner'
import type { IBannerDTO } from '@/types/banner'

export const getBanners = (
  searchQuery: string,
  status: ActiveStatus,
  linkType: LinkTypes,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    status,
    linkType,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/banner',
      params
    },
    true
  )
}

export const getBanner = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/banner/${id}`
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
      url: '/banner/upsert',
      data
    },
    true
  )
}

export const changeBannersStatus = (
  ids: (string | number)[],
  status: ActiveStatus
): Promise<unknown> => {
  const params = {
    ids,
    status
  }
  return request.put(
    {
      url: '/banner/change-status',
      params
    },
    true
  )
}

export const deleteBanners = (ids: (string | number)[]): Promise<unknown> => {
  const params = {
    ids
  }
  return request.delete(
    {
      url: '/banner/delete',
      params
    },
    true
  )
}
