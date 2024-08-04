<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="bg-gray-100 min-h-screen">
    <div class="max-w-4xl mx-auto py-24">
      <div class="p-14 bg-white">
        <RouterView />
      </div>
    </div>
  </main>
</template>
