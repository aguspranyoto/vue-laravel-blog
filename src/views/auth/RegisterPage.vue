<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, required, email } from '@vuelidate/validators'
import { createUser } from './actions/RegisterUser'
import type { IRegisterInput } from './actions/RegisterUser'
import InputField from '../../components/InputField.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const registerInput = ref<IRegisterInput>({ name: '', email: '', password: '' })

const nameRequired$ = helpers.withMessage('Name is required', required)
const emailRequired$ = helpers.withMessage('Email is required', required)
const passwordRequired$ = helpers.withMessage('Password is required', required)

const nameMinLength$ = (min: number) =>
  helpers.withMessage(({ $params }) => `Name should contain ${$params.min} digits.`, minLength(min))
const passwordMinLength$ = (min: number) =>
  helpers.withMessage(`Password should contain ${min} digits.`, minLength(min))

const rules = {
  name: { nameRequired$, minLength: nameMinLength$(3) },
  email: { emailRequired$, email },
  password: { passwordRequired$, minLength: passwordMinLength$(6) }
}

const v$ = useVuelidate(rules, registerInput)

async function registerUser() {
  const result = await v$.value.$validate()

  if (!result) {
    return
  }

  const data = await createUser(registerInput.value)

  // Check for successful registration based on your API response
  if (data.message === 'your account was created !') {
    toast.success('register successfully')
    router.push('/auth/login')
  } else {
    // Handle registration failure, e.g., show an error message
    console.error('Registration failed:', data.message)
  }
}
</script>

<template>
  <div class="">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Register form</h1>
    </div>
    <form class="" @submit.prevent="registerUser">
      <!-- name -->
      <InputField label="Name" :errors="v$.name.$errors">
        <input
          type="text"
          v-model="registerInput.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      /></InputField>

      <!-- email -->
      <InputField label="Email" :errors="v$.email.$errors">
        <input
          type="email"
          v-model="registerInput.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </InputField>

      <!-- password -->
      <InputField label="Password" :errors="v$.password.$errors">
        <input
          type="password"
          v-model="registerInput.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </InputField>

      <div>
        <span
          >Already have an account?
          <RouterLink class="text-blue-600" to="/auth/login">please login</RouterLink></span
        >
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="my-3 bg-black hover:bg-black/70 text-white font-bold py-1 px-6 rounded"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>
