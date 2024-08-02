<script setup lang="ts">
import * as yup from 'yup'
import { ref } from 'vue'

import MessagesContainer from '@/components/messages-container/Index.vue'
import NavBar from '@/components/NavBar.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import Signature from '@/components/Signature.vue'

import type { Message } from '@/lib/types'
import { sendRequest, validateForm, TEMPLATES } from '@/lib/utils'
import { Role } from '@/lib/types/dto'
import { ApiResponse } from '@/lib/classes'

const messages = ref([] as Message[])
const isLoading = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('' as Role)
const roles = [{ [Role.USER]: 'Usuário' }, { [Role.ADMIN]: 'Admin' }]

const schema = yup.object().shape({
  name: yup.string().required(TEMPLATES.yup.required('Nome')),
  email: yup
    .string()
    .email(TEMPLATES.yup.email('E-mail'))
    .required(TEMPLATES.yup.required('E-mail')),
  role: yup
    .string()
    .oneOf(
      Object.values(Role),
      TEMPLATES.yup.oneOf(
        roles
          .map((r) => {
            const [_, v] = Object.entries(r)[0]
            return v.toLowerCase()
          })
          .join(', ')
      )
    )
    .required(TEMPLATES.yup.required('Acesso')),
  password: yup
    .string()
    .min(8, TEMPLATES.yup.minString('Senha', 8))
    .required(TEMPLATES.yup.required('Senha')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required(TEMPLATES.yup.required('Confirme a senha'))
})

async function sendForm() {
  isLoading.value = true

  const validation = validateForm(
    {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      role: role.value
    },
    schema
  )
  if (validation) {
    messages.value = validation.messages
    isLoading.value = false
    return
  }

  const res = await sendRequest('/users', 'POST', {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value
  })
  isLoading.value = false

  if (res instanceof ApiResponse) {
    messages.value = res.messages
    resetForm()
  } else {
    messages.value = res!.messages
  }
}

function resetForm() {
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  role.value = ''
}
</script>

<template>
  <main class="w-full h-full flex flex-col items-center pt-20 pb-2 lg:pt-48">
    <NavBar :page-name="'Adicionar Usuário'" />

    <form class="flex flex-col w-10/12 md:w-80">
      <Input v-model="name" name="name" placeholder="Nome" autocomplete="none" required />
      <Input v-model="email" name="email" placeholder="E-mail" autocomplete="none" required />
      <Input v-model="password" name="password" type="password" placeholder="Senha" autocomplete="new-password"
        minlength="8" required />
      <Input v-model="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme a senha"
        autocomplete="new-password" minlength="8" required />
      <Select v-model="role" :options="roles" name="Acesso" placeholder="Acesso" required></Select>
      <SubmitButton :text="'Adicionar'" :is-loading="isLoading" @click="sendForm" />
    </form>
    <Signature class="mt-auto"/>
  </main>
  <MessagesContainer :messages />
</template>
