// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/FormaLogin.vue'),
      },
      {
        path: '/pedirMaterial',
        name: 'pedirMaterial',
        component: () => import('@/views/PrestamoMaterial.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
