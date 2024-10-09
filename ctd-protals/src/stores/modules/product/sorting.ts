import type { ISortItem, ISortValue } from '@/types/sorting'
import { sortingSource as mockSortingSource } from '@/constants/mockData/product/sorting'

export const useSorting = () => {
  const sortingSource = ref<ISortItem[]>([])

  const getSortingSource = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      sortingSource.value = mockSortingSource
      resolve()
    })
  }

  const sortings = ref<ISortValue>({ sortType: 'comprehensive', order: 'desc' as const })

  return {
    sortingSource,
    getSortingSource,
    sortings
  }
}
