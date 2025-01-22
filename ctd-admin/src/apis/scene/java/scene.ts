import request from '@/axios'
import type { ActiveStatus } from '@/constants/mapData'
import type { ISceneDTO, ISceneItem } from '@/types/scene'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'
import { omit } from 'lodash-es'

export const getScenes = (
  searchQuery: string,
  filters: IFilterDTO<ISceneItem>[],
  sorts: ISort<ISceneItem>[],
  columns: ITableColumnDTO<ISceneItem>[],
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
      url: '/platform/scene/list',
      data
    },
    true
  )
}

export const getScene = (id: string | number): Promise<unknown> => {
  return request.get(
    {
      url: `/platform/scene/${id}`
    },
    true
  )
}

export const upsertScene = (id: string | number, sceneInfoRaw: ISceneDTO): Promise<unknown> => {
  const sceneInfo = omit(sceneInfoRaw, ['createdAt', 'updatedAt', 'readCount', 'company'])
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
  return request.post(
    {
      url: '/platform/scene/change-status',
      data
    },
    true
  )
}

export const deleteScenes = (ids: (string | number)[]): Promise<unknown> => {
  const data = {
    ids
  }
  return request.post(
    {
      url: '/platform/scene/delete',
      data
    },
    true
  )
}

export const getSceneOptionsByName = (name: string): Promise<unknown> => {
  const params = {
    name
  }
  return request.get(
    {
      url: '/platform/scene/get-options-by-name',
      params
    },
    true
  )
}

export const getSceneOptionsByID = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.get(
    {
      url: '/platform/scene/get-options-by-id',
      params
    },
    true
  )
}
