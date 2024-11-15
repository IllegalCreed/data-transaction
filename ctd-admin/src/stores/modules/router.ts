import type { RouteMeta } from 'vue-router'

interface RouteLike {
  path: string
  name: string
  meta: RouteMeta
}

export const useRouterStore = defineStore('router', () => {
  const visitedViews = ref<RouteLike[]>([])
  const cachedViews = ref<string[]>([])

  const addView = (view: RouteLike) => {
    addVisitedView(view)
    addCachedView(view)
  }

  function deleteView(view: RouteLike): void {
    deleteVisitedView(view)
    deleteCachedView(view)
  }

  function deleteVisitedView(view: RouteLike): void {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  function deleteCachedView(view: RouteLike): void {
    const index = cachedViews.value.indexOf(view.name as string)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  function addVisitedView(view: RouteLike): void {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    if (view.meta.title) {
      visitedViews.value.push(
        Object.assign({}, view, {
          title: view.meta.title
        })
      )
    }
  }

  function addCachedView(view: RouteLike): void {
    if (cachedViews.value.includes(view.name as string)) return
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name as string)
    }
  }

  return { visitedViews, cachedViews, addView, deleteView }
})
