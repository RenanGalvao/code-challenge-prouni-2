<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router/index'

import { useTokenStore } from '@/stores/token'
import { useSendForm } from '@/lib/composables'
import { ApiResponse } from '@/lib/classes'
import Input from '@/components/Input.vue'
import MessagesContainer from '@/components/messages-container/Index.vue'
import type { Message } from '@/lib/types'
import LoaderIcon from '@/assets/icons/loader.vue'

const tokenStore = useTokenStore()
const REDIRECT_WAIT = 1000

const email = ref('')
const password = ref('')
const messages = ref([] as Message[])
const isLoading = ref(false)

async function sendForm() {
    isLoading.value = true
    const res = await useSendForm('/auth/sign-in', 'POST', {
        email: email.value,
        password: password.value
    })
    isLoading.value = false

    if (res instanceof ApiResponse) {
        tokenStore.updateToken(res.data)
        messages.value = res.messages

        setTimeout(async () => {
            await router.push({ path: '/' })
        }, REDIRECT_WAIT)
    } else {
        messages.value = res!.messages
    }
}
</script>

<template>
    <main class="w-full h-full flex flex-col items-center justify-center">
        <form class="flex flex-col w-10/12 md:w-80">
            <h1 class="text-3xl text-center mb-2">Acesso</h1>

            <Input v-model="email" name="email" type="email" placeholder="E-mail" autocomplete="email" required />
            <Input v-model="password" name="password" type="password" placeholder="Senha"
                autocomplete="current-password" minlength="8" required />

            <button @click.prevent="sendForm"
                class="w-full bg-complementary text-dominant rounded py-2 mt-1 flex justify-center">
                <template v-if="isLoading">
                    <LoaderIcon />
                </template>
                <template v-else>
                    Entrar
                </template>
            </button>
        </form>
    </main>

    <MessagesContainer :messages />
</template>