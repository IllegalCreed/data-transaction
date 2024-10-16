export const useCreate = () => {
  const baseInfo = reactive({
    title: '',
    desc: '',
    detail: '',
    completionTime: ''
  })

  const tradingModel = ref('')

  const setTradingModel = (model: string) => {
    tradingModel.value = model
  }

  const paymentOption = reactive({
    selectedMethod: 'project',
    budgetType: 'fixed',
    fixedPrice: 0,
    minPrice: 0,
    maxPrice: 0
  })

  const customTags = ref<string[]>([])
  const checkedPopularTags = ref<string[]>([])
  const selectedTags = computed(() => {
    return [...checkedPopularTags.value, ...customTags.value]
  })

  return {
    baseInfo,
    tradingModel,
    setTradingModel,
    paymentOption,
    customTags,
    checkedPopularTags,
    selectedTags
  }
}
