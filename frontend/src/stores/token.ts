import { defineStore } from 'pinia'
const LOCAL_STORAGE_KEY = 'auth'

export const useTokenStore = defineStore('token', {
  state: () => {
    let accessToken = ''
    if (localStorage) {
      accessToken = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ''
    }

    return {
      accessToken
    }
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken
    }
  },
  actions: {
    updateToken(newAccessToken: string) {
      this.accessToken = newAccessToken
      if (localStorage) {
        localStorage.setItem(LOCAL_STORAGE_KEY, this.accessToken)
      }
    },
    eraseStore() {
      this.accessToken = ''
      if (localStorage) {
        localStorage.setItem(LOCAL_STORAGE_KEY, '')
      }
    },
    isLoggedIn() {
      return this.accessToken !== ''
    }
  }
})
