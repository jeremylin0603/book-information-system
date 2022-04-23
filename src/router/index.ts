import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export enum RouterNameEnum {
  homeView = 'homeView',
  modifyView = 'modifyView'
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouterNameEnum.homeView,
    component: () => import('@/views/HomeView.vue'),
    meta: { isKeepAlive: true }
  },
  {
    path: '/modify-view',
    name: RouterNameEnum.modifyView,
    component: () => import('@/views/ModifyView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
