<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useTokenStore } from '@/stores/token'
import LoginIcon from '@/assets/icons/login.vue'
import LogoutIcon from '@/assets/icons/logout.vue'
import ChevronLeftIcon from '@/assets/icons/chevron-left.vue'

defineProps({
  pageName: {
    type: String,
    required: true
  }
})

const tokenStore = useTokenStore()
const route = useRoute()
</script>

<template>
  <nav class="w-full fixed top-0 p-4 shadow-md flex justify-between items-center bg-dominant">
    <header class="flex justify-center items-center">
      <RouterLink v-if="route.path !== '/'" :to="'/'">
        <ChevronLeftIcon class="mr-1 w-8 h-8" />
      </RouterLink>
      <h1 class="text-xl">{{ pageName }}</h1>
    </header>

    <div v-if="!tokenStore.isLoggedIn()">
      <RouterLink :to="'/login'" class="flex"
        >Entrar
        <LoginIcon class="ml-1" />
      </RouterLink>
    </div>

    <div v-if="tokenStore.isLoggedIn()">
      <RouterLink :to="'/logout'" class="flex"
        >Sair
        <LogoutIcon class="ml-1" />
      </RouterLink>
    </div>
  </nav>
</template>
