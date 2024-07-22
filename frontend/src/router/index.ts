import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import UsersListView from '@/views/UsersListView.vue'
import type { Pagination } from '@/lib/types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      beforeEnter: (to, from) => {
        const tokenStore = useTokenStore()

        if (tokenStore.isLoggedIn()) {
          return { name: from.name }
        }
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => { },
      beforeEnter: () => {
        const tokenStore = useTokenStore()
        tokenStore.eraseStore()
        return { path: '/' }
      }
    },
    {
      path: '/',
      name: 'Usuários',
      component: UsersListView,
      beforeEnter: (to, from) => {
        const pagination = {
          itemsPerPage: 5,
          page: 1
        } as Pagination

        if (Object.keys(to.query).length === 0) {
          return { path: '/', query: pagination }
        }
      }
    },
    {
      path: '/add',
      name: 'Adicionar Usuário',
      component: () => import('@/views/UserAddView.vue'),
      beforeEnter: () => {
        const tokenStore = useTokenStore()

        if (!tokenStore.isLoggedIn()) {
          return { path: '/login' }
        }
      }
    },
    {
      path: '/edit/:id',
      name: 'Editar Usuário',
      component: () => import('@/views/UserEditView.vue'),
      beforeEnter: () => {
        const tokenStore = useTokenStore()

        if (!tokenStore.isLoggedIn()) {
          return { path: '/login' }
        }
      }
    }
  ]
})


export default router
