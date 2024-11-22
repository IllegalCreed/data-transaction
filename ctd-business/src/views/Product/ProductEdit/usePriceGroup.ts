import type { WatchHandle } from 'vue'
import { generateKey, cartesianProduct } from '../ProductDetail/usePriceList'
import type {
  IProductSpecGroup,
  IProductSpecsPrice,
  IProductSpecsPriceDefinition,
  IProductSpecsPriceFrontendGroup,
  IProductSpecsPriceFrontendItem
} from '@/types/product'

function generateSpecsPriceGroup(priceInfo: IProductSpecsPriceDefinition) {
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

  const priceGroups: IProductSpecsPriceFrontendGroup[] = mainSpecOptions.map((mainSpecOption) => {
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

export const usePriceGroup = (priceInfo: IProductSpecsPriceDefinition) => {
  const priceList = ref<IProductSpecsPriceFrontendGroup[]>([])

  /* 四种情况需要重新生成价格列表
   * 1.增删规格
   * 2.增删价格相关的规格项
   * 3.修改价格相关
   * 4.切换主规格
   */
  const genPriceList = () => {
    priceList.value = generateSpecsPriceGroup(priceInfo)
  }

  // 主规格相关
  const mainSpecGroupOptions = computed(() => {
    return priceInfo.specs
      .filter((item) => item.affectsPrice === true)
      .map((item) => {
        return {
          value: item.id,
          label: item.label
        }
      })
  })
  watch(mainSpecGroupOptions, () => {
    if (mainSpecGroupOptions.value.length === 0) {
      priceInfo.mainSpecGroupId = undefined
    }
  })
  watch(
    () => priceInfo.mainSpecGroupId,
    () => {
      if (priceInfo.mainSpecGroupId) {
        genPriceList()
      }
    }
  )

  // 价格变化监控
  const innerWatchers = new Map<string, WatchHandle[]>()
  function addInnerWatcher(spec: IProductSpecGroup) {
    const unwatchList = []

    // 监听 spec.children 的变化
    const unwatchChildren = watch(
      () => spec.children.map((child) => child.id),
      (newIds, oldIds) => {
        // 仅当 affectsPrice 为 true 时，spec 才会影响价格的key
        if (spec.affectsPrice === true) {
          // 当增加规格项，仅增加一组新价格（主规格）或每组新增若干价格（从规格），原有价格无需变化。
          // 当减少规格项，那么需要删除一组价格（主规格）或每组中相关价格（从规格）。其他价格不变。
          const removedIds = oldIds.filter((id) => !newIds.includes(id))
          if (removedIds.length > 0) {
            // 当 spec 是主规格时，删除包含被删除规格项的价格项
            priceInfo.prices = priceInfo.prices.filter((priceItem) => {
              // 检查 priceItem.specs 中是否包含被删除的规格项
              const hasRemovedSpec = priceItem.specs.some(
                (specItem) => specItem.groupId === spec.id && removedIds.includes(specItem.specId)
              )
              // 返回 true 保留，返回 false 删除
              return !hasRemovedSpec
            })
          }
          genPriceList()
        }
      }
    )
    unwatchList.push(unwatchChildren)

    // 监听 spec.affectsPrice 的变化
    const unwatchAffectsPrice = watch(
      () => spec.affectsPrice,
      () => {
        // 当 affectsPrice 为 true 时，只能成为一个从规格，那么必然会影响所有价格的key，所以价格需要清空
        // 当 affectsPrice 为 false 时，如果为主规格，则必然会切换主规格，那么必然会影响所有价格的key，所以价格需要清空
        // 当 affectsPrice 为 false 时，如果不为主规格，也必然不会影响所有价格的key，所以价格需要清空
        // 也就是所有情况下当affectsPrice发生变化时，价格设定都需要清空
        priceInfo.prices = []
        genPriceList()
      }
    )
    unwatchList.push(unwatchAffectsPrice)

    // 将监听器存储到 Map 中
    innerWatchers.set(spec.id, unwatchList)
  }

  function clearInnerWatcher(id: string) {
    const unwatchList = innerWatchers.get(id)
    if (unwatchList) {
      unwatchList.forEach((unwatch) => unwatch())
      innerWatchers.delete(id)
    }
  }

  watch(
    () => priceInfo.specs.map((spec) => spec.id),
    (newIds, oldIds) => {
      const addedIds = newIds.filter((id) => !oldIds.includes(id))
      const removedIds = oldIds.filter((id) => !newIds.includes(id))
      addedIds.forEach((id) => {
        const spec = priceInfo.specs.find((item) => item.id === id)
        if (spec) {
          addInnerWatcher(spec)
        }
      })
      removedIds.forEach((id) => {
        clearInnerWatcher(id)
      })
      genPriceList()
    }
  )
  return {
    priceList,
    mainSpecGroupOptions
  }
}

function compareSpecs(
  specsA: { groupId: string; specId: string }[],
  specsB: { groupId: string; specId: string; label: string }[]
) {
  if (specsA.length !== specsB.length) return false
  const sortedA = specsA.slice().sort((a, b) => a.groupId.localeCompare(b.groupId))
  const sortedB = specsB.slice().sort((a, b) => a.groupId.localeCompare(b.groupId))
  return sortedA.every((spec, index) => {
    return spec.groupId === sortedB[index].groupId && spec.specId === sortedB[index].specId
  })
}

export function updatePriceInfoPrices(
  pricesDef: IProductSpecsPrice[],
  mainGroup: IProductSpecsPriceFrontendGroup,
  item: IProductSpecsPriceFrontendItem
) {
  // 构建完整的规格列表，包括主规格
  const fullSpecs = [
    {
      groupId: mainGroup.groupId, // 主规格组ID
      specId: mainGroup.specId,
      label: mainGroup.label
    },
    ...item.specs
  ]

  // 在 priceInfo.prices 中查找对应的价格项
  const priceEntry = pricesDef.find((entry: IProductSpecsPrice) => {
    return compareSpecs(entry.specs, fullSpecs)
  })

  if (priceEntry) {
    // 更新价格
    if (item.price) {
      priceEntry.price = item.price
    } else {
      // 如果价格为空，则删除价格项
      pricesDef.splice(pricesDef.indexOf(priceEntry), 1)
    }
  } else {
    // 添加新的价格项
    if (item.price) {
      pricesDef.push({
        price: item.price,
        specs: fullSpecs.map(({ groupId, specId }) => ({ groupId, specId }))
      })
    }
  }
}
