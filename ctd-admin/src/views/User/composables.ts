import { useDelete } from '@/composables/useDelete'
import { useUserStore } from '@/stores/modules/user'
import { useChangeStatus } from '@/composables/useChangeStatus'
import { UserStatus } from '@/constants/mapData/user'

export const useDeleteUser = (refresh: () => void) => {
  const { deleteUsers: deleteUsersAction } = useUserStore()

  const delLabel = ref('')
  const delIds = ref<(string | number)[]>([])
  const { doDelAction } = useDelete(
    () => `是否确认删除 ${delLabel.value} ？`,
    async () => {
      await deleteUsersAction(delIds.value)
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

export const useChangeUserStatus = (refresh: () => void) => {
  const { changeUsersStatus: changeUsersStatusAction } = useUserStore()

  const changeLabel = ref('')
  const changeIds = ref<(string | number)[]>([])
  const changeStatus = ref<UserStatus>()
  const { doChangeAction } = useChangeStatus(
    () =>
      `是否确认将 ${changeStatus.value === UserStatus.Active ? '启用' : '停用'} ${changeLabel.value} ？`,
    async () => {
      if (!changeStatus.value) {
        ElMessage.error('请选择状态')
        return
      }
      await changeUsersStatusAction(changeIds.value, changeStatus.value)
      refresh()
    }
  )
  const handleChangeStatus = (ids: (string | number)[], label: string, newStatus: UserStatus) => {
    changeLabel.value = label
    changeIds.value = ids
    changeStatus.value = newStatus
    doChangeAction()
  }

  return {
    handleChangeStatus
  }
}

export const useSearchUser = (refresh: () => void) => {
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
