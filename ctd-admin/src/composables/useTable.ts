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
      .filter((item) => {
        if (item.type === 'input') {
          return item.value !== undefined && item.value !== ''
        } else if (item.type === 'boolean') {
          return item.value !== undefined
        } else if (item.type === 'enum') {
          if (Array.isArray(item.value)) {
            return item.value.length > 0
          } else {
            return item.value !== undefined
          }
        } else if (item.type === 'date') {
          return item.value !== undefined
        } else if (item.type === 'number') {
          return Array.isArray(item.value) && (item.value[0] !== null || item.value[1] !== null)
        } else {
          return false
        }
      })
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
