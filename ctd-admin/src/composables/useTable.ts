import type { IFilter, IFilterDTO, ISort, ITableColumn, ITableColumnDTO } from '@/types/table'

export const useTable = <T>(
  initialSortList: ISort<T>[],
  initialFilterList: IFilter<T>[],
  initialColumnList: ITableColumn<T>[]
) => {
  const sortList = ref<ISort<T>[]>(initialSortList)
  const filterList = ref<IFilter<T>[]>(initialFilterList)
  const columnList = ref<ITableColumn<T>[]>(initialColumnList)

  const filterDTO = computed(() => convertToFilterDTO(filterList.value as IFilter<T>[]))
  const columnDTO = computed(() => convertToColumnDTO(columnList.value as ITableColumn<T>[]))
  const sortDTO = computed(() => convertToSortDTO(sortList.value as ISort<T>[]))

  const convertToFilterDTO = (filters: IFilter<T>[]): IFilterDTO<T>[] => {
    return filters
      .map((item) => ({
        prop: item.prop,
        type: item.type,
        value: item.value
      }))
      .filter((item) => item.value)
  }

  const convertToColumnDTO = (columnList: ITableColumn<T>[]): ITableColumnDTO<T>[] => {
    return columnList
      .map((item) => ({
        prop: item.prop,
        visible: item.visible
      }))
      .filter((item) => item.visible)
  }

  const convertToSortDTO = (sortList: ISort<T>[]): ISort<T>[] => {
    return sortList.filter((item) => item.order)
  }

  return {
    sortList,
    filterList,
    columnList,
    filterDTO,
    columnDTO,
    sortDTO
  }
}
