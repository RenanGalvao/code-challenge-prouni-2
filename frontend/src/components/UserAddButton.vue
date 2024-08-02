<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import { Role } from '@/lib/types/dto'
import PlusIcon from '@/assets/icons/plus.vue'
const tokenStore = useTokenStore()
const userStore = useUserStore()
const hasPermission = computed(() => {
  return userStore.getRole === Role.ADMIN && tokenStore.isLoggedIn()
})
</script>

<template>
  <Transition>
    <div class="fixed bottom-4 right-4 lg:w-full lg:right-0">
      <div class="lg:w-11/12 xl:w-8/12 lg:mx-auto flex justify-end">
        <RouterLink v-if="hasPermission" :to="'/add'">
          <button class="bg-complementary text-dominant p-4 rounded-md">
            <PlusIcon />
          </button>
        </RouterLink>
      </div>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
