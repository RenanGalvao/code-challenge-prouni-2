<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'

import { useTokenStore } from '@/stores/token'
import type { User } from '@/lib/types/dto'
import { friendlyDateString } from '@/lib/utils'
import EditIcon from '@/assets/icons/edit.vue'
import DeleteIcon from '@/assets/icons/delete.vue'

defineProps<{
  data: User[]
}>()

defineEmits({
  'user-delete'(user: User) {
    return !!user
  }
})

const tokenStore = useTokenStore()
</script>

<template>
  <div class="w-full overflow-y-auto">
    <div v-for="user in data" :key="user.id" class="shadow-lg rounded p-2 mb-2">
      <div class="flex justify-between">
        <span>Nome:</span>
        <span>{{ user.name }}</span>
      </div>
      <div class="flex justify-between">
        <span>E-mail: </span>
        <span>{{ user.email }}</span>
      </div>
      <div class="flex justify-between">
        <span>Acesso:</span>
        <span>{{ user.role }}</span>
      </div>
      <div class="flex justify-between">
        <span>Criado em:</span>
        <span>{{ friendlyDateString(user.createdAt) }}</span>
      </div>
      <div class="flex justify-between">
        <span>Atualizado em:</span>
        <span>{{ friendlyDateString(user.updatedAt ?? '') }}</span>
      </div>
      <div v-if="tokenStore.isLoggedIn()" class="flex justify-end mt-2">
        <RouterLink :to="`/edit/${user.id}`">
          <EditIcon />
        </RouterLink>
        <DeleteIcon @click="$emit('user-delete', user)" class="ml-4" />
      </div>
    </div>
  </div>
</template>
