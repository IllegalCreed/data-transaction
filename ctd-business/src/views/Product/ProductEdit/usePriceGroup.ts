import type { Reactive } from 'vue'
import { generateKey, cartesianProduct } from '../ProductDetail/usePriceList'
import type { IProductSpecsPriceDefinition, IProductSpecsPriceGroup } from '@/types/product'

export function generateSpecsPriceGroup(priceInfo: IProductSpecsPriceDefinition) {
  const { mainSpecGroupId, specs, prices: priceEntries } = priceInfo
  const mainSpecGroup = specs.find((group) => group.id === mainSpecGroupId)
  if (!mainSpecGroup) {
    return []
  }

  const otherSpecGroups = specs.filter(
    (group) => group.affectsPrice && group.id !== mainSpecGroupId
  )

  const mainSpecOptions = mainSpecGroup.children.map((spec) => ({
    groupId: mainSpecGroup.id,
    specId: spec.id,
    label: spec.label
  }))

  const otherSpecOptions = otherSpecGroups.map((group) =>
    group.children.map((spec) => ({
      groupId: group.id,
      specId: spec.id,
      label: spec.label
    }))
  )

  const otherCombinations = cartesianProduct(otherSpecOptions)

  const priceMap = new Map<string, number>()
  priceEntries.forEach((priceEntry) => {
    const key = generateKey(priceEntry.specs)
    priceMap.set(key, priceEntry.price)
  })

  const priceGroups: IProductSpecsPriceGroup[] = mainSpecOptions.map((mainSpecOption) => {
    const children = otherCombinations.map((combination) => {
      const fullSpecs = [mainSpecOption, ...combination]

      const key = generateKey(fullSpecs.map(({ groupId, specId }) => ({ groupId, specId })))

      const price = priceMap.get(key) ?? undefined

      return {
        price,
        specs: combination
      }
    })

    return reactive({
      groupId: mainSpecOption.groupId,
      specId: mainSpecOption.specId,
      label: mainSpecOption.label,
      children
    })
  })

  return priceGroups
}
