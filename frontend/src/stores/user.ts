import { defineStore } from 'pinia'
const LOCAL_STORAGE_KEY = 'user'
import type { User } from '@/lib/types/dto'

export const useUserStore = defineStore('user', {
    state: () => {
        let user: User | null = null
        if (localStorage) {
            user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? 'null')
        }

        return {
            user,
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getRole(state) {
            return state.user?.role
        }
    },
    actions: {
        updateUser(newUser: User) {
            this.user = newUser
            if(localStorage) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.user))
            }
        },
        eraseStore() {
            this.user = null
            if(localStorage) {
                localStorage.setItem(LOCAL_STORAGE_KEY, 'null')
            }
        }
    }
})