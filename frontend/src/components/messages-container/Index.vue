<template>
    <div id="messages-container" class="fixed bottom-0 right-0 z-10 w-full p-8 flex flex-col items-center md:items-end">
        <template v-for="message in _messages">
            <Toast v-bind="message" />
        </template>
    </div>
</template>


<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Message } from '@/lib/types'
import Toast from './Toast.vue'

const props = defineProps<{ messages: Message[] }>()
const _messages = ref([] as Message[])

const delay_period = 100 // in ms
let accumulated_period = 0

watchEffect(() => {
    props.messages.forEach((msg) => {
        _messages.value.push({
            ...msg,
            delay: accumulated_period,
            duration: msg.duration + accumulated_period
        })
        accumulated_period += delay_period
    })
    //_messages = [..._messages]
})
</script>