<script setup>
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile'
import BaseInput from '@/components/base/BaseInput.vue'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: ''
})

const validate = () => {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Enter your email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Wrong email'
  }

  if (!form.password) {
    errors.password = 'Enter your password'
  }

  return !errors.email && !errors.password
}

const profileStore = useProfileStore()

const handleSubmit = () => {
  if (!validate()) return
  const response = await fetch('localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: form.email,
        password: form.password
      })
    });
  const result = await response.json();

  if (response.status != 200) {
    alert('Incorrect login or password!')
    return;
  }
  profileStore.scientist.name = result.name
  profileStore.scientist.username = result.username
  router.push('/profile')
}
</script>

<template>
  <div class="flex min-h-screen flex-col lg:flex-row">
    <section
      class="relative flex flex-1 items-end bg-cover bg-center px-10 py-12 text-white"
      style="background-image: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url('img/login_background.jpg');"
    >
      <div>
        <div class="mb-8 text-white">
          <img src="@/assets/img/sirius_university_logo.svg" alt="Sirius University" class="w-100">
        </div>
        <h1 class="text-5xl font-bold leading-tight text-white">Let’s Collaborate!</h1>
      </div>
    </section>

    <section class="flex flex-1 items-center justify-center bg-surface px-6 py-10">
      <form
        class="w-full max-w-lg rounded-3xl bg-white px-8 py-10 shadow-card"
        @submit.prevent="handleSubmit"
      >
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-primary-dark">Welcome Back!</h2>
          <p class="text-sm text-muted">Log in to continue working with your academic profile</p>
        </div>
        <div class="space-y-5">
          <BaseInput
            label="Email"
            v-model="form.email"
            placeholder="Input your email"
            autocomplete="email"
            :error="errors.email"
          />
          <BaseInput
            label="Password"
            v-model="form.password"
            placeholder="Input your password"
            type="password"
            autocomplete="current-password"
            :error="errors.password"
            show-password-toggle
          />
        </div>
        <div class="mt-5 flex items-center justify-between text-sm text-muted">
        </div>
        <button
          type="submit"
          class="mt-6 w-full rounded-2xl bg-primary px-6 py-3 text-lg font-semibold text-white transition hover:bg-primary-dark"
        >
          Log in
        </button>
        <p class="mt-6 text-center text-sm text-muted">
          Don't have an account?
          <RouterLink to="/register" class="font-semibold text-primary hover:text-secondary">
            Register
          </RouterLink>
        </p>
      </form>
    </section>
  </div>
</template>

