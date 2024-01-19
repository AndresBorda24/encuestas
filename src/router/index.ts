import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      children: [
        {
          path: '',
          name: 'create-encuesta',
          component: HomeView
        }, {
          path: ':id/edit',
          name: 'update-encuesta',
          component: HomeView
        }
      ]
    }
  ]
})

export default router
