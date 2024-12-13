import * as javaCase from './java/case'
import * as nestCase from './nest/case'

interface ICaseAPI {
  getCases: (pageNum: number, pageSize: number) => Promise<unknown>
  getScene: (id: number | string) => Promise<unknown>
}

type SceneAPIType = ICaseAPI

const javaAPI: SceneAPIType = {
  ...javaCase,
}

const nestAPI: SceneAPIType = {
  ...nestCase,
}

const sceneAPI: SceneAPIType =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getCases, getScene } = sceneAPI
