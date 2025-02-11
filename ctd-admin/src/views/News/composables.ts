import { useDelete } from '@/composables/useDelete'
import { useNewsStore } from '@/stores/modules/news'
import { useChangeStatus } from '@/composables/useChangeStatus'
import { ActiveStatus } from '@/constants/mapData'

export const useDeleteNews = (refresh: () => void) => {
  const { deleteNews: deleteNewsAction } = useNewsStore()

  const delLabel = ref('')
  const delIds = ref<(string | number)[]>([])
  const { doDelAction } = useDelete(
    () => `是否确认删除 ${delLabel.value} ？`,
    async () => {
      await deleteNewsAction(delIds.value)
      refresh()
    }
  )
  const handleDelete = (ids: (string | number)[], title: string) => {
    delLabel.value = title
    delIds.value = ids
    doDelAction()
  }

  return {
    handleDelete
  }
}

export const useChangeNewsStatus = (refresh: () => void) => {
  const { changeNewsStatus: changeNewsStatusAction } = useNewsStore()

  const changeLabel = ref('')
  const changeIds = ref<(string | number)[]>([])
  const changeStatus = ref<ActiveStatus>()
  const { doChangeAction } = useChangeStatus(
    () =>
      `是否确认将 ${changeStatus.value === ActiveStatus.Active ? '启用' : '停用'} ${changeLabel.value} ？`,
    async () => {
      if (!changeStatus.value) {
        ElMessage.error('请选择状态')
        return
      }
      await changeNewsStatusAction(changeIds.value, changeStatus.value)
      refresh()
    }
  )
  const handleChangeStatus = (ids: (string | number)[], label: string, newStatus: ActiveStatus) => {
    changeLabel.value = label
    changeIds.value = ids
    changeStatus.value = newStatus
    doChangeAction()
  }

  return {
    handleChangeStatus
  }
}

export const useSearchNews = (refresh: () => void) => {
  const searchQuery = ref<string>('')

  const reset = () => {
    searchQuery.value = ''
    refresh()
  }

  return {
    searchQuery,
    reset
  }
}
