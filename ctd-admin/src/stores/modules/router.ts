import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useRouterStore = defineStore('router', () => {
  const visitedViews = ref<any[]>([])
  const cachedViews = ref<any[]>([])

  const addView = (view: RouteLocationNormalizedLoaded) => {
    addVisitedView(view)
    addCachedView(view)
  }

  function deleteView(view: RouteLocationNormalizedLoaded) {
    deleteVisitedView(view)
    deleteCachedView(view)
  }

  function deleteVisitedView(view: RouteLocationNormalizedLoaded) {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  function deleteCachedView(view: RouteLocationNormalizedLoaded) {
    const index = cachedViews.value.indexOf(view.name)
    index > -1 && cachedViews.value.splice(index, 1)
  }

  function addVisitedView(view: RouteLocationNormalizedLoaded) {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    if (view.meta.title) {
      visitedViews.value.push(
        Object.assign({}, view, {
          title: view.meta.title
        })
      )
    }
  }

  function addCachedView(view: RouteLocationNormalizedLoaded) {
    if (cachedViews.value.includes(view.name)) return
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name)
    }
  }

  return { visitedViews, cachedViews, addView, deleteView }
})
