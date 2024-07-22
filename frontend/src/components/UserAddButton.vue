<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useTokenStore } from '@/stores/token'
import PlusIcon from '@/assets/icons/plus.vue'
const tokenStore = useTokenStore()

const showButton = ref(true)
const MIN_HEIGHT_TO_FADE = 50 // in px
const TIME_TO_FADE = 1 * 1000 // in ms
let timeout: number = 0

onMounted(() => {
    window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll, true)
})

function handleScroll(event: Event) {
    const scrollTop = (event.target as HTMLDivElement).scrollTop

    if (timeout) {
        clearTimeout(timeout)
    }

    if (scrollTop >= MIN_HEIGHT_TO_FADE) {
        timeout = setTimeout(() => {
            showButton.value = false
        }, TIME_TO_FADE)
    } else {
        showButton.value = true
    }
}
</script>

<template>
    <Transition>
        <RouterLink v-if="tokenStore.isLoggedIn() && showButton" :to="'/add'" class="fixed bottom-4 right-4 z-20 h">
            <button class="bg-complementary text-dominant p-5 rounded-md">
                <PlusIcon />
            </button>
        </RouterLink>
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