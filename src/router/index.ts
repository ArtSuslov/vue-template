import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { ROUTE_NAMES } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: ROUTE_NAMES.uiKit },
  },
  {
    path: '/ui-kit',
    name: ROUTE_NAMES.uiKit,
    component: () => import('@/pages/UiKitPage.vue'),
  },
  {
    path: '/test',
    name: ROUTE_NAMES.test,
    component: () => import('@/pages/Test.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRouter, useRoute }
