import type { IFilter, IFilterDTO, ISort, ISortDTO } from '@/types/table'

export const useSortAndFilter = (initialSortList: ISort[], initialFilterList: IFilter[]) => {
  const sortList = ref<ISort[]>(initialSortList)
  const filterList = ref<IFilter[]>(initialFilterList)

  const sortDTO = computed(() => convertToSortDTO(sortList.value))
  const filterDTO = computed(() => convertToFilterDTO(filterList.value))

  const convertToSortDTO = (sort: ISort[]): ISortDTO[] => {
    return sort.map((item) => ({
      key: item.columns.key,
      order: item.order
    }))
  }

  const convertToFilterDTO = (filters: IFilter[]): IFilterDTO[] => {
    return filters.map((item) => ({
      key: item.columns.key,
      type: item.columns.type,
      value: item.value
    }))
  }

  return {
    sortList,
    filterList,
    sortDTO,
    filterDTO
  }
}
