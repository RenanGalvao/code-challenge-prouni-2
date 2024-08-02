import { createRouter, createWebHistory } from 'vue-router'
import UsersListView from '@/views/UsersListView.vue'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import type { Pagination } from '@/lib/types'
import { Role } from '@/lib/types/dto'

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
        const userStore = useUserStore()
        userStore.eraseStore()
        return { path: '/' }
      }
    },
    {
      path: '/',
      name: 'Usuários',
      component: UsersListView,
      beforeEnter: (to, from) => {
        const pagination = {
          itemsPerPage: 10,
          page: 1
        } as Pagination

        if (!to.query.page || !to.query.itemsPerPage) {
          return { path: '/', query: { ...pagination, ...from.query } }
        }
      }
    },
    {
      path: '/add',
      name: 'Adicionar Usuário',
      component: () => import('@/views/UserAddView.vue'),
      beforeEnter: () => {
        const tokenStore = useTokenStore()
        const userStore = useUserStore()

        if (!tokenStore.isLoggedIn() || userStore.getRole !== Role.ADMIN) {
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
        const userStore = useUserStore()

        if (!tokenStore.isLoggedIn() || userStore.getRole !== Role.ADMIN) {
          return { path: '/login' }
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    },
  ]
})

export default router
