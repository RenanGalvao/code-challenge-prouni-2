<script setup lang="ts">
import LoaderIcon from '@/assets/icons/loader.vue'

defineProps({
    isLoading: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})
defineEmits(['click'])
</script>

<template>
    <button
        @click.prevent="$emit('click')"
        class="w-full bg-complementary text-dominant rounded py-2 mt-1 flex justify-center"
      >
        <template v-if="isLoading">
          <LoaderIcon />
        </template>
        <template v-else>{{ text }}</template>
      </button>
</template>