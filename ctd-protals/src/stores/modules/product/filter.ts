import { useSettingsStore } from '@/stores/modules/settings'
import type { IFilter } from '@/types/filter'
import { getProductFilterSource as getFilterSourceAPI } from '@/apis/product/filter'
import { filterSource as mockFilterSource } from '@/constants/mockData/product/filter'

export const useFilter = () => {
  const settingsStore = useSettingsStore()

  const filterSource = ref<IFilter[]>([])

  const getFilterSource = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (settingsStore.mockEnabled) {
        window.setTimeout(() => {
          filterSource.value = mockFilterSource
          resolve()
        }, 1000)
      } else {
        getFilterSourceAPI()
          .then((res: unknown) => {
            filterSource.value = res as IFilter[]
            resolve()
          })
          .catch((error: unknown) => {
            reject(error)
          })
      }
    })
  }

  const filters = ref<Record<string, string>>({})
  watch(filterSource, () => {
    if (!filterSource.value) return
    filters.value = filterSource.value.reduce(
      (acc, filter) => {
        acc[filter.id] = 'all'
        return acc
      },
      {} as Record<string, string>
    )
  })

  return {
    filterSource,
    getFilterSource,
    filters
  }
}
