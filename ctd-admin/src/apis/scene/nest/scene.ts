import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { ISceneDTO } from '@/types/scene'

export const getScenes = (
  searchQuery: string,
  status: ActiveStatus | null,
  isOuterLink: boolean | null,
  pageNum: number,
  pageSize: number
): Promise<unknown> => {
  const params = {
    searchQuery,
    status,
    isOuterLink,
    pageNum,
    pageSize
  }
  return request.get(
    {
      url: '/scene',
      params
    },
    true
  )
}

export const getScene = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/scene/${id}`
    },
    true
  )
}

export const upsertScene = (id: string | number, sceneInfo: ISceneDTO): Promise<unknown> => {
  const data = {
    id,
    ...sceneInfo
  }

  return request.post(
    {
      url: '/scene/upsert',
      data
    },
    true
  )
}

export const changeScenesStatus = (
  ids: (string | number)[],
  status: ActiveStatus
): Promise<unknown> => {
  const data = {
    ids,
    status
  }
  return request.put(
    {
      url: '/scene/change-status',
      data
    },
    true
  )
}

export const deleteScenes = (ids: (string | number)[]): Promise<unknown> => {
  const params = {
    ids
  }
  return request.delete(
    {
      url: '/scene/delete',
      params
    },
    true
  )
}
