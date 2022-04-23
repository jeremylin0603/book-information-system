import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export enum RouterNameEnum {
  homeView = 'homeView',
  detailView = 'detailView'
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouterNameEnum.homeView,
    component: () => import('@/views/HomeView/index.vue'),
    meta: { isKeepAlive: true }
  },
  {
    path: '/detail-view/:id',
    name: RouterNameEnum.detailView,
    component: () => import('@/views/DetailView/index.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
