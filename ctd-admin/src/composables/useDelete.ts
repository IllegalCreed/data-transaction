import { ElMessage, ElMessageBox } from 'element-plus'

export function useDelete(tip: string, delAction: () => void) {
  const doDelAction = async () => {
    try {
      await ElMessageBox.confirm(tip, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await delAction()
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
    } catch {}
  }

  return { doDelAction }
}
