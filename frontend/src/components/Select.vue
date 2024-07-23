<script setup lang="ts">
import { defineModel, defineProps } from 'vue'
const model = defineModel()

defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  options: {
    type: Array<{ [key: string]: any }>,
    required: true
  }
})
</script>

<template>
  <select
    class="w-full border-2 border-complementary/30 focus:border-complementary/60 focus:outline-none focus:ring-0 rounded p-2 mb-1 bg-dominant valid:text-complementary text-complementary/40"
    :value="model"
    :name
    :required
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="Object.keys(option)[0]"
      :value="Object.keys(option)[0]"
      class="text-complementary"
    >
      {{ option[Object.keys(option)[0]] }}
    </option>
  </select>
</template>
