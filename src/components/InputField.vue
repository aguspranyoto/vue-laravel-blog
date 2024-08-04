<script lang="ts" setup>
import { ErrorObject } from '@vuelidate/core'

defineProps<{
  label: string
  errors: ErrorObject[]
}>()
</script>
<template>
  <div class="mb-4" :class="{ error: errors.length }">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{ label }}</label>
    <slot></slot>
    <div v-for="error of errors" :key="error.$uid">
      <div class="text-red-500">{{ error.$message }}</div>
    </div>
  </div>
</template>
