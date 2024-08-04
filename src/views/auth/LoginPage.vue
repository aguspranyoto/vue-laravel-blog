<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, required, email } from '@vuelidate/validators'
import { signInUser } from './actions/LoginUser'
import type { ILoginInput } from './actions/LoginUser'
import InputField from '../../components/InputField.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const loginInput = ref<ILoginInput>({ name: '', email: '', password: '' })

const emailRequired$ = helpers.withMessage('Email is required', required)
const passwordRequired$ = helpers.withMessage('Password is required', required)

const passwordMinLength$ = (min: number) =>
  helpers.withMessage(`Password should contain ${min} digits.`, minLength(min))

const rules = {
  email: { emailRequired$, email },
  password: { passwordRequired$, minLength: passwordMinLength$(6) }
}

const v$ = useVuelidate(rules, loginInput)

async function loginUser() {
  const result = await v$.value.$validate()

  if (!result) {
    return
  }

  const data = await signInUser(loginInput.value)
  if (data.message === 'user logged') {
    toast.success('login successfully', 'success')
    router.push('/')
  }
}
</script>

<template>
  <div class="">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Login form</h1>
    </div>
    <form class="" @submit.prevent="loginUser">
      <!-- email -->
      <InputField label="Email" :errors="v$.email.$errors">
        <input
          type="email"
          v-model="loginInput.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </InputField>

      <!-- password -->
      <InputField label="Password" :errors="v$.password.$errors">
        <input
          type="password"
          v-model="loginInput.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </InputField>

      <div>
        <span
          >Doesn't have an account?
          <RouterLink class="text-blue-600" to="/auth/register">please register</RouterLink></span
        >
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="my-3 bg-black hover:bg-black/70 text-white font-bold py-1 px-6 rounded"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
