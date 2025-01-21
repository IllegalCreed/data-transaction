import * as javaFile from './java/file'
import * as nestFile from './nest/file'

interface IFileAPI {
  upload: (file: File) => Promise<unknown>
}

type FileAPIType = IFileAPI

const javaAPI: FileAPIType = {
  ...javaFile
}

const nestAPI: FileAPIType = {
  ...nestFile
}

const fileAPI: FileAPIType = import.meta.env.VITE_BACK_TYPE === 'java' ? javaAPI : nestAPI

export const { upload } = fileAPI
