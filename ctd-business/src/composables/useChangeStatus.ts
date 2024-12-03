export function useChangeStatus(tip: () => string, changeAction: () => void) {
  const doChangeAction = async () => {
    try {
      await ElMessageBox.confirm(tip(), '修改状态', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await changeAction()
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    } catch {}
  }

  return { doChangeAction }
}
