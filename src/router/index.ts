import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthPage.vue'),
      children: [
        {
          path: '',
          name: 'auth-default',
          redirect: { name: 'login' }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginPage.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterPage.vue')
        }
      ]
    }
  ]
})

export default router
