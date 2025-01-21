import { v4 as uuidv4 } from 'uuid'
import type { Ref } from 'vue'
import type { IUploadFile } from '@/types/common'
import { useFileStore } from '@/stores/modules/file'

export function useSingleImage(imageUrl: Ref<string | undefined>) {
  const imageRef = ref<IUploadFile>()

  watch(
    imageUrl,
    (newValue) => {
      if (!newValue) return
      imageRef.value = {
        id: uuidv4(),
        url: newValue,
        name: newValue,
        raw: undefined
      }
    },
    {
      immediate: true
    }
  )

  const { uploadFile: uploadFileAction } = useFileStore()
  const uploadImage = async (): Promise<string | undefined> => {
    if (imageRef.value) {
      if (imageRef.value.raw) {
        const url = await uploadFileAction(imageRef.value.raw)
        return url
      }
    }
  }

  return { imageRef, uploadImage }
}
