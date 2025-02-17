import { useDelete } from '@/composables/useDelete'
import { useBannerStore } from '@/stores/modules/banner'
import { useChangeStatus } from '@/composables/useChangeStatus'
import { ActiveStatus } from '@/constants/mapData'

export const useDeleteBanners = (refresh: () => void) => {
  const { deleteBanners: deleteBannersAction } = useBannerStore()

  const delLabel = ref('')
  const delIds = ref<(string | number)[]>([])
  const { doDelAction } = useDelete(
    () => `是否确认删除 ${delLabel.value} ？`,
    async () => {
      await deleteBannersAction(delIds.value)
      refresh()
    }
  )
  const handleDelete = (ids: (string | number)[], fullName: string) => {
    delLabel.value = fullName
    delIds.value = ids
    doDelAction()
  }

  return {
    handleDelete
  }
}

export const useChangeBannersStatus = (refresh: () => void) => {
  const { changeBannersStatus: changeBannersStatusAction } = useBannerStore()

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
      await changeBannersStatusAction(changeIds.value, changeStatus.value)
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

export const useSearchBanner = (refresh: () => void) => {
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
