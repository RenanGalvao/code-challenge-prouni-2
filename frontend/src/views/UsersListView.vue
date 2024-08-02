<script setup lang="ts">
import { ref, onMounted } from 'vue'

import MessagesContainer from '@/components/messages-container/Index.vue'
import NavBar from '@/components/NavBar.vue'
import UserAddButton from '@/components/UserAddButton.vue'
import UserList from '@/components/UserList.vue'
import UserListLG from '@/components/UserListLG.vue'
import Pagination from '@/components/Pagination.vue'
import Signature from '@/components/Signature.vue'

import { useScreenWidth } from '@/lib/composables'
import { ApiListResponse, ApiResponse } from '@/lib/classes'
import type { Message } from '@/lib/types'
import type { User } from '@/lib/types/dto'
import { sendRequest, loadList, TEMPLATES } from '@/lib/utils'

const isLoading = ref(false)
const messages = ref([] as Message[])
const { LG_SCREEN_SIZE, widthScreen } = useScreenWidth()

const data = ref([] as User[])
const totalCount = ref(0)
const totalPages = ref(1)

onMounted(async () => {
  await loadData()
})

async function loadData() {
  isLoading.value = true
  const res = await loadList<User>('/users', new URL(window.location.href))

  if (res instanceof ApiListResponse) {
    data.value = res.data
    totalCount.value = res.info.totalCount
    totalPages.value = res.info.totalPages
  } else {
    messages.value = res!.messages
  }
  isLoading.value = false
}

async function onUserDelete(user: User) {
  const areYouSure = confirm(TEMPLATES.remove.user(user))
  if (areYouSure) {
    const res = await sendRequest(`/users/${user.id}`, 'DELETE')
    if (res instanceof ApiResponse) {
      messages.value = res.messages
      await loadData()
    } else {
      messages.value = res!.messages
    }
  }
}
</script>

<template>
  <main class="w-full h-full flex flex-col pt-14 pb-2 items-center">
    <NavBar :page-name="'Usuários'" />
    <UserList v-if="widthScreen < LG_SCREEN_SIZE" :data @user-delete="onUserDelete" />
    <UserListLG v-if="widthScreen >= LG_SCREEN_SIZE" :data @user-delete="onUserDelete" />
    <Pagination :max-page="totalPages" @page-updated="loadData" class="mt-auto" />
    <UserAddButton />
    <Signature />
  </main>

  <MessagesContainer :messages />
</template>
