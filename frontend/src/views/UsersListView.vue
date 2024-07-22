<script setup lang="ts">
import { ref, onMounted } from 'vue'

import MessagesContainer from '@/components/messages-container/Index.vue'
import NavBar from '@/components/NavBar.vue'
import UserAddButton from '@/components/UserAddButton.vue'
import UserList from '@/components/UserList.vue'
import UserListLG from '@/components/UserListLG.vue'
import Pagination from '@/components/Pagination.vue'

import { useDeleteItem, useLoadList, useScreenWidth } from '@/lib/composables'
import { ApiListResponse, ApiResponse } from '@/lib/classes'
import type { Message } from '@/lib/types'
import type { User } from '@/lib/types/dto'
import { TEMPLATES } from '@/lib/utils'

const isLoading = ref(false)
const messages = ref([] as Message[])
const { LG_SCREEN_SIZE, widthScreen } = useScreenWidth()

const data = ref([] as User[])
const totalCount = ref(0)
const totalPages = ref(1)

onMounted(async () => {
    await loadList()
})

async function loadList() {
    isLoading.value = true
    const res = await useLoadList('/users', new URL(window.location.href))

    if (res instanceof ApiListResponse) {
        data.value = res.data
        totalCount.value = res.info.totalCount
        totalPages.value = res.info.totalPages
        messages.value = res.messages
    }
    isLoading.value = false
}

async function onUserDelete(user: User) {
    const areYouSure = confirm(TEMPLATES.remove.user(user))
    if (areYouSure) {
        const res = await useDeleteItem('/users', user.id)
        if (res instanceof ApiResponse) {
            messages.value = res.messages
            await loadList()
        }
    }
}

</script>

<template>
    <main class="w-full h-full flex flex-col pt-14">
        <NavBar :page-name="'Usuários'" />
        <UserList v-if="widthScreen < LG_SCREEN_SIZE" :data @user-delete="onUserDelete" />
        <UserListLG v-if="widthScreen >= LG_SCREEN_SIZE" :data @user-delete="onUserDelete" />
        <Pagination :max-page="totalPages" @page-updated="loadList" class="mt-auto" />
        <UserAddButton />
    </main>

    <MessagesContainer :messages />
</template>
