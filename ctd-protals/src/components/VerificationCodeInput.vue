<template>
  <div class="verification-container">
    <input
      v-for="(code, index) in codeLength"
      :key="index"
      ref="inputs"
      v-model="verificationCodes[index]"
      @input="handleInput(index, $event)"
      @keydown="handleKeyDown(index, $event)"
      @paste="handlePaste($event)"
      @focus="handleFocus(index, $event)"
      maxlength="1"
      class="verification-input"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })
const { codeLength = 6 } = defineProps<{ codeLength?: number }>()

// 补齐函数
const padArray = (array: string[], length: number): string[] => {
  // 如果数组长度超过指定长度，截取前 length 个元素
  if (array.length > length) {
    return array.slice(0, length)
  }
  // 如果数组长度小于指定长度，补齐空字符串
  return array.concat(Array(length - array.length).fill(''))
}

// 将 modelValue 的字符串转换为字符数组
const verificationCodes = ref(padArray(modelValue.value.split(''), codeLength))

// 当 verificationCodes 改变时，自动更新父组件的字符串值
watch(
  verificationCodes,
  (newCodes) => {
    modelValue.value = newCodes.join('')
  },
  { deep: true }
)

// 监听 codeLength 的变化，当长度改变时，重新生成字符数组
watch(
  () => codeLength,
  (newLength) => {
    verificationCodes.value = padArray(modelValue.value.split(''), newLength)
  }
)

// 标记是否正在处理粘贴事件
let isPasting = false

// 处理输入
const handleInput = (index: number, event: Event) => {
  // 如果正在处理粘贴，则忽略 input 事件
  if (isPasting) {
    return
  }

  const input = event.target as HTMLInputElement

  // 限制输入仅为单个字符
  if (input.value.length > 1) {
    input.value = input.value.slice(0, 1)
  }

  // 将输入的值放入验证码数组
  verificationCodes.value[index] = input.value

  // 自动跳转到下一个输入框
  if (index < codeLength - 1 && input.value) {
    focusNextInput(index)
  }
}

// 处理键盘事件
const handleKeyDown = (index: number, event: KeyboardEvent) => {
  const input = event.target as HTMLInputElement

  // 按退格键时，如果当前输入框为空，跳到上一个输入框
  if (event.key === 'Backspace' && !input.value && index > 0) {
    focusPreviousInput(index)
  }
}

// 处理粘贴事件
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault() // 阻止默认粘贴行为
  isPasting = true // 开始处理粘贴，禁用 handleInput

  const pasteData = event.clipboardData?.getData('text') || ''

  // 限制粘贴数据长度，不能超过验证码长度
  const validData = pasteData.slice(0, codeLength)

  // 将粘贴数据分配到每个输入框
  validData.split('').forEach((char, index) => {
    verificationCodes.value[index] = char
  })

  // 在粘贴之后，自动聚焦到最后一个已填的输入框的下一个
  const nextInputIndex = validData.length >= codeLength ? codeLength - 1 : validData.length
  focusNextInput(nextInputIndex - 1)

  // 延时解除粘贴标记
  setTimeout(() => {
    isPasting = false // 允许 handleInput 恢复正常
  }, 0)
}

// 处理聚焦事件，自动选中已有字符
const handleFocus = (index: number, event: FocusEvent) => {
  const input = event.target as HTMLInputElement
  if (input.value) {
    input.select() // 如果当前输入框有值，则选中该字符
  }
}

// 输入框的 ref 数组
const inputs = ref<(HTMLInputElement | null)[]>([])

// 聚焦下一个输入框
const focusNextInput = (index: number) => {
  const nextInput = inputs.value[index + 1]
  if (nextInput) {
    nextInput.focus()
  }
}

// 聚焦上一个输入框
const focusPreviousInput = (index: number) => {
  const prevInput = inputs.value[index - 1]
  if (prevInput) {
    prevInput.focus()
  }
}
</script>

<style lang="scss" scoped>
.verification-container {
  @apply flex flex-row items-center space-x-2;
  .verification-input {
    @apply w-10 h-10 text-center text-xl border-1 border-solid border-gray-300 rounded-md outline-none transition-colors focus:border-red-400;
  }
}
</style>
