import type { Ref } from 'vue'
import type { IMenu } from '@/types/master'

const DROPDOWN_WIDTH = 56
const MENU_ITEM_WIDTH = 32

export function useResponsiveMenu(
  menus: Ref<IMenu[] | undefined>,
  menuContainerRef: Ref<HTMLElement | null>,
  shadowMenuItemsRef: Ref<HTMLAnchorElement[] | null>
) {
  const visibleLinks = ref<IMenu[]>([])
  const dropdownLinks = ref<IMenu[]>([])

  // 计算可见的菜单项数量
  const updateMenu = () => {
    if (!menuContainerRef.value) return

    if (!shadowMenuItemsRef.value || shadowMenuItemsRef.value.length === 0) {
      return
    }

    const dropdownWidth = DROPDOWN_WIDTH
    let containerWidth = menuContainerRef.value.clientWidth + MENU_ITEM_WIDTH
    let totalWidth = 0

    shadowMenuItemsRef.value.forEach((item) => {
      totalWidth += item.clientWidth + MENU_ITEM_WIDTH
    })

    if (totalWidth > containerWidth) {
      containerWidth -= dropdownWidth
    }

    totalWidth = 0
    const tempVisibleLinks: IMenu[] = []
    const tempDropdownLinks: IMenu[] = []

    if (menus.value) {
      for (const index in menus.value) {
        const linkElement = shadowMenuItemsRef.value?.[index]
        if (linkElement) {
          const linkWidth = linkElement.clientWidth + MENU_ITEM_WIDTH
          if (totalWidth + linkWidth < containerWidth) {
            totalWidth += linkWidth
            tempVisibleLinks.push(menus.value[index])
          } else {
            tempDropdownLinks.push(...menus.value.slice(Number(index)))
            break
          }
        }
      }
    }

    visibleLinks.value = tempVisibleLinks
    dropdownLinks.value = tempDropdownLinks
  }

  watch(menus, () => {
    updateMenu()
  })

  watch(menuContainerRef, () => {
    updateMenu()
  })

  watch(shadowMenuItemsRef, () => {
    updateMenu()
  })

  onMounted(() => {
    updateMenu()
    useEventListener(window, 'resize', updateMenu)
  })

  return {
    visibleLinks,
    dropdownLinks
  }
}
