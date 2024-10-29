import type { ISearchResult } from '@/types/search'

export const useSearchResult = (props: ISearchResult) => {
  const moduleConfig = {
    produce: {
      icon: 'i-tabler:database-dollar',
      tag: '数据产品',
      tagType: 'success' as const,
    },
    service: {
      icon: 'i-carbon:data-vis-1',
      tag: '数据服务',
      tagType: 'warning' as const,
    },
    scene: {
      icon: 'i-carbon:application-web',
      tag: '应用场景',
      tagType: 'info' as const,
    },
    demand: {
      icon: 'i-carbon:document-requirements',
      tag: '产品需求',
      tagType: 'danger' as const,
    },
    consult: {
      icon: 'i-lineicons:consulting',
      tag: '咨询代办',
      tagType: 'primary' as const,
    },
  }

  const iconClass = computed(() => moduleConfig[props.module].icon)
  const moduleTag = computed(() => moduleConfig[props.module].tag)
  const tagType = computed(() => moduleConfig[props.module].tagType)

  const router = useRouter()
  const navigateToDetail = () => {
    switch (props.module) {
      case 'produce':
        router.push(`/details/produce/${props.id}`)
        break
      case 'service':
        router.push(`/details/service/${props.id}`)
        break
      case 'scene':
        router.push(`/details/scene/${props.id}`)
        break
      case 'demand':
        router.push(`/details/demand/${props.id}`)
        break
      case 'consult':
        router.push(`/details/consult/${props.id}`)
        break
    }
  }

  return {
    iconClass,
    moduleTag,
    tagType,
    navigateToDetail,
  }
}
