import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'create-encuesta',
          component: () => import('@/components/the-create.vue')
        }, {
          path: ':id/edit',
          name: 'update-encuesta',
          component: () => import('@/components/the-update.vue')
        }
      ]
    }
  ]
})

export default router
