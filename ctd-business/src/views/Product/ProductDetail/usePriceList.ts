import type { IProductSpecsPriceDefinition } from '@/types/product'
import type { Ref } from 'vue'

interface ISpecOption {
  groupId: string
  specId: string
  label: string
}

export function usePriceList(priceInfo: Ref<IProductSpecsPriceDefinition>) {
  const priceList = computed(() => {
    const { defaultPrice, mainSpecGroupId, specs, prices: priceEntries } = priceInfo.value

    // 过滤并排序影响价格的规格组
    const sortedSpecGroups = specs
      .filter((group) => group.affectsPrice)
      .sort((a, b) => {
        if (a.id === mainSpecGroupId) return -1
        if (b.id === mainSpecGroupId) return 1
        return 0
      })

    // 提取规格选项
    const specOptions = sortedSpecGroups.map((group) =>
      group.children.map((spec) => ({
        groupId: group.id,
        specId: spec.id,
        label: spec.label
      }))
    )

    const combinations = cartesianProduct(specOptions)

    // 创建价格映射表
    const priceMap = new Map<string, number>()
    priceEntries.forEach((priceEntry) => {
      const key = generateKey(priceEntry.specs)
      priceMap.set(key, priceEntry.price)
    })

    // 组装最终的价格列表
    return combinations.map((combination) => {
      const specKeySpecs = combination.map(({ groupId, specId }) => ({ groupId, specId }))
      const key = generateKey(specKeySpecs)
      const price = priceMap.get(key) ?? defaultPrice
      const specsLabels = combination.map(({ label }) => label)
      return { specs: specsLabels, price }
    })
  })

  return { priceList }
}

export function generateKey(specs: { groupId: string; specId: string }[]): string {
  const sortedSpecs = specs.slice().sort((a, b) => a.groupId.localeCompare(b.groupId))
  return sortedSpecs.map((spec) => `${spec.groupId}:${spec.specId}`).join('|')
}

export function cartesianProduct(arrays: ISpecOption[][]): ISpecOption[][] {
  if (arrays.length === 0) return [[]]
  return arrays.reduce(
    (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])),
    [[] as ISpecOption[]]
  )
}
