<script setup lang="ts">
import { defineModel, defineProps } from 'vue'
const model = defineModel()

defineProps({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    },
    placeholder: {
        type: String,
        required: false,
    },
    autocomplete: {
        type: String,
        required: false
    },
    required: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<template>
    <input
        class="w-full border-2 border-complementary/30 focus:border-complementary/60 focus:outline-none focus:ring-0 rounded p-2 mb-1"
        :value="model" :name :type :placeholder :autocomplete :required
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>