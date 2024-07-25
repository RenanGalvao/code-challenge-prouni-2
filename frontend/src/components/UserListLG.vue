<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import { type User, Role } from '@/lib/types/dto'
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
const userStore = useUserStore()
const hasPermission = computed(() => {
  return userStore.getRole === Role.ADMIN && tokenStore.isLoggedIn()
})
</script>

<template>
  <div class="w-full overflow-y-auto mt-6 flex justify-center">
    <table class="w-11/12 xl:w-8/12 table-auto">
      <thead class="border-b-complementary/15 border-b">
        <tr>
          <th class="text-start">Nome</th>
          <th class="text-start">E-mail</th>
          <th class="text-start">Acesso</th>
          <th class="text-start">Criado em</th>
          <th class="text-start">Atualizado em</th>
          <th v-if="hasPermission" colspan="2" class="text-start">Opções</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(user, index) in data" :key="user.id">
          <tr :class="index % 2 === 0 ? 'bg-complementary/10' : ''">
            <td class="py-1">{{ user.name }}</td>
            <td class="py-1">{{ user.email }}</td>
            <td class="py-1">{{ user.role }}</td>
            <td class="py-1">{{ friendlyDateString(user.createdAt, true) }}</td>
            <td class="py-1">{{ friendlyDateString(user.updatedAt ?? '', true) }}</td>
            <td v-if="hasPermission" class="py-1">
              <RouterLink :to="`/edit/${user.id}`">
                <EditIcon />
              </RouterLink>
            </td>
            <td v-if="hasPermission" class="py-1">
              <DeleteIcon @click="$emit('user-delete', user)" class="cursor-pointer" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
