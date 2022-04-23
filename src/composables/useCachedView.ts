import { useRoute } from 'vue-router'
import { watch, reactive } from 'vue'

interface FnReturn {
  cachedViews: CachedViews
}

type CachedViews = Array<string>

export default function useCachedViews(): FnReturn {
  const route = useRoute()

  const cachedViews = reactive<CachedViews>([])

  const setCachedView = (routeName: string) => {
    if (cachedViews.includes(routeName)) return
    cachedViews.push(routeName)
  }

  watch(
    () => route.name,
    () => {
      if (route.name && route.meta?.isKeepAlive) {
        setCachedView(route.name as string)
      }
    }
  )

  return {
    cachedViews
  }
}
