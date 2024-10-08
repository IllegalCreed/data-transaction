import { useSettingsStore } from '@/stores/modules/settings'
import { getRecords as getRecordsAPI } from '@/apis/master/records'
import { records as mockRecords } from '@/constants/mockData/master/record'

export const useRecord = () => {
  const settingsStore = useSettingsStore()

  const records = ref<string[]>()

  const getRecords = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          records.value = mockRecords
          resolve()
        }, 1000)
      } else {
        getRecordsAPI()
          .then((res: unknown) => {
            records.value = res as string[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  return {
    records,
    getRecords
  }
}
