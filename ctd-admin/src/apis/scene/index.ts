import type { ActiveStatus } from '@/constants/mapData'
import * as javaScene from './java/scene'
import * as nestScene from './nest/scene'
import type { ISceneDTO, ISceneItem } from '@/types/scene'
import type { IFilterDTO, ISort, ITableColumnDTO } from '@/types/table'

interface ISceneAPI {
  getScenes: (
    searchQuery: string,
    filters: IFilterDTO<ISceneItem>[],
    sorts: ISort<ISceneItem>[],
    columns: ITableColumnDTO<ISceneItem>[],
    pageNum: number,
    pageSize: number
  ) => Promise<unknown>
  getScene: (id: string | number) => Promise<unknown>
  upsertScene: (id: string | number, newsInfo: ISceneDTO) => Promise<unknown>
  changeScenesStatus: (ids: (string | number)[], status: ActiveStatus) => Promise<unknown>
  deleteScenes: (ids: (string | number)[]) => Promise<unknown>
  getSceneOptionsByName: (searchQuery: string) => Promise<unknown>
  getSceneOptionsByID: (id: string | number) => Promise<unknown>
}

type SceneAPIType = ISceneAPI

const javaAPI: SceneAPIType = {
  ...javaScene
}

const nestAPI: SceneAPIType = {
  ...nestScene
}

const newsAPI: SceneAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const {
  getScenes,
  getScene,
  upsertScene,
  changeScenesStatus,
  deleteScenes,
  getSceneOptionsByName,
  getSceneOptionsByID
} = newsAPI
