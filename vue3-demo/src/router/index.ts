import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/baiduMap.vue')
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: () => import('@/views/elDialog.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/gVideo.vue')
    }
  ]
})

export default router
