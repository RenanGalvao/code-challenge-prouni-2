<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ChevronLeftIcon from '@/assets/icons/chevron-left.vue'
import ChevronRightIcon from '@/assets/icons/chevron-right.vue'

defineProps({
  maxPage: {
    type: Number,
    required: false,
    default: 1
  }
})
const emits = defineEmits(['page-updated'])

const PAGES_AROUND_CURRENT = 0
const route = useRoute()
const router = useRouter()
const pageFromQuery =
  route.query.page && !Number.isNaN(Number(route.query.page)) ? Number(route.query.page) : 1
const page = ref(pageFromQuery)

function isPrintablePage(pageNumber: number) {
  return (
    pageNumber === page.value ||
    pageNumber + PAGES_AROUND_CURRENT === page.value ||
    pageNumber - PAGES_AROUND_CURRENT === page.value
  )
}

function toPage(pageNumber: number) {
  page.value = pageNumber
}

watch(page, async () => {
  await router.push({ path: route.path, query: { ...route.query, page: page.value } })
  emits('page-updated')
})
</script>

<template>
  <div class="w-full flex justify-center items-center p-2 text-lg z-20">
    <button
      v-if="page !== 1"
      class="mr-2 bg-complementary text-dominant rounded w-6 h-6"
      @click="toPage(page - 1)"
    >
      <ChevronLeftIcon />
    </button>

    <template v-for="(_, index) of Array(maxPage)" :key="`${index}${new Date().getTime()}`">
      <button v-if="isPrintablePage(index + 1)" class="underline">
        {{ index + 1 }}
      </button>
    </template>

    <button
      v-if="page !== maxPage && page + PAGES_AROUND_CURRENT < maxPage"
      @click="toPage(page + 1)"
      class="ml-2 bg-complementary text-dominant rounded w-6 h-6"
    >
      <ChevronRightIcon />
    </button>
  </div>
</template>
