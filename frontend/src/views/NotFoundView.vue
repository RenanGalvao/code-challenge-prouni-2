<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
    <main class="w-full h-full flex flex-col items-center justify-center">
        <h1 class="text-3xl text-center mb-2">Página não encontrada!</h1>

        <RouterLink :to="route.redirectedFrom?.fullPath ?? '/'" class="text-center mt-2">Voltar</RouterLink>
    </main>
</template>