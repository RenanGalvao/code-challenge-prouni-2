<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import { useScreenWidth } from '@/lib/composables'
import { shrinkText } from '@/lib/utils'
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
const userStore = useUserStore()
const route = useRoute()
const { SM_SCREEN_SIZE, widthScreen } = useScreenWidth()
const name = computed(() => {
  if (widthScreen.value < SM_SCREEN_SIZE) {
    return shrinkText(userStore.getUser?.name ?? '', 14)
  } else {
    return userStore.getUser?.name
  }
})
</script>

<template>
  <nav class="w-full fixed top-0 p-4 shadow-md  bg-dominant">
    <div class="flex justify-between items-center lg:w-11/12 xl:w-8/12 mx-auto">
      <header class="flex justify-center items-center">
        <RouterLink v-if="route.path !== '/'" :to="'/'">
          <ChevronLeftIcon class="mr-1 w-8 h-8" />
        </RouterLink>
        <h1 class="text-xl">{{ pageName }}</h1>
      </header>

      <div v-if="!tokenStore.isLoggedIn()">
        <RouterLink :to="'/login'" class="flex">Entrar
          <LoginIcon class="ml-1" />
        </RouterLink>
      </div>

      <div v-if="tokenStore.isLoggedIn()" class="flex">
        <span class="mr-2">Olá, {{ name }}</span>
        <RouterLink :to="'/logout'" class="flex">Sair
          <LogoutIcon class="ml-1" />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
