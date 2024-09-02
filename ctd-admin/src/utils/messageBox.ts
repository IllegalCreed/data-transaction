import { ElMessage, ElMessageBox } from 'element-plus'
type MessageType = 'success' | 'warning' | 'info' | 'error'

function hint(
  content: string,
  title: string,
  type: MessageType,
  resolve: () => void,
  reject?: () => void
) {
  ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
    .then(() => {
      resolve()
    })
    .catch(() => {
      reject?.()
    })
}

export function closeHint(resolve: () => void) {
  hint('确定关闭吗?', '', 'warning', resolve)
}

export function deleteHint(content: string, resolve: () => void) {
  hint(content, '删除确认', 'warning', resolve)
}

export function warningMessage(
  title: string = '系统提示',
  content: string,
  resolve: () => void,
  reject?: () => void
) {
  hint(content, title, 'warning', resolve, reject)
}

export function successMessage(content: string, defaultSuccess: boolean = true) {
  ElMessage({
    message: `${content}${defaultSuccess ? '成功' : ''}`,
    type: 'success'
  })
}

export function errorMessage(content: string, defaultError: boolean = true) {
  ElMessage({
    message: `${defaultError ? '错误：' : ''}${content}`,
    type: 'error',
    duration: 5 * 1000
  })
}
