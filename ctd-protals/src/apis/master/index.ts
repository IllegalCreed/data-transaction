import * as javaLink from './java/link'
import * as nestLink from './nest/link'

interface ILinkAPI {
  getLinks: () => Promise<unknown>
}

type MasterAPIType = ILinkAPI

const javaAPI: MasterAPIType = {
  ...javaLink,
}

const nestAPI: MasterAPIType = {
  ...nestLink,
}

const masterAPI: MasterAPIType =
  import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { getLinks } = masterAPI
