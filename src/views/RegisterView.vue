<script setup>
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'

const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  position: '',
  scopus: '',
  scholar: '',
  wos: '',
  rsci: '',
  orcid: '',
  password: '',
  confirm: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  orcid: '',
  password: '',
  confirm: ''
})

const validate = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!form.firstName) errors.firstName = 'Enter first name'
  if (!form.lastName) errors.lastName = 'Enter surname'

  if (!form.email) {
    errors.email = 'Enter email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Wrong email'
  }

  if (form.password.length < 6) {
    errors.password = 'Use more symbols'
  }

  if (form.confirm !== form.password) {
    errors.confirm = 'Passwords must be similar'
  }

  return Object.values(errors).every((message) => !message)
}

const handleSubmit = () => {
  if (!validate()) return
  router.push('/profile')
}
</script>

<template>
  <div class="flex min-h-screen flex-col lg:flex-row">
    <section
      class="hidden flex-1 items-end bg-cover bg-center px-10 py-12 text-white lg:flex"
      style="background-image: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url('/img/login_background.jpg');"
    >
      <div>
        <div class="mb-8 text-white">
          <img src="@/assets/img/sirius_university_logo.svg" alt="Sirius University" class="w-100">
        </div>
        <h1 class="text-5xl font-bold leading-tight text-white">Sign Up</h1>
      </div>
    </section>

    <section class="flex flex-1 items-center justify-center bg-surface px-6 py-10">
      <form
        class="w-full max-w-3xl rounded-3xl bg-white px-8 py-10 shadow-card"
        @submit.prevent="handleSubmit"
      >
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-primary-dark">Create an academical profile</h2>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <BaseInput label="First name" v-model="form.firstName" placeholder="John" :error="errors.firstName" autocomplete="given-name" />
          <BaseInput label="Surname" v-model="form.lastName" placeholder="Johnson" :error="errors.lastName" autocomplete="family-name" />
          <BaseInput class="md:col-span-2" label="Username" v-model="form.username" placeholder="JohnSirius" :error="errors.lastName" autocomplete="family-name" />
          <BaseInput class="md:col-span-2" label="E-Mail" v-model="form.email" placeholder="name@siriusuniversity.ru" :error="errors.email" autocomplete="email" />
          <BaseInput class="md:col-span-2" label="Google Scholar ID" v-model="form.scholar" placeholder="YBxwE6gAAAAJ" :error="errors.orcid" autocomplete="off" />
          <BaseInput class="md:col-span-2" label="Scopus ID" v-model="form.scopus" placeholder="7003328281" :error="errors.orcid" autocomplete="off" />
          <BaseInput class="md:col-span-2" label="Wos ID" v-model="form.wos" placeholder="JMQ-4547-2023" :error="errors.orcid" autocomplete="off" />
          <BaseInput class="md:col-span-2" label="RSCI ID" v-model="form.rsci" placeholder="8389-6072" :error="errors.orcid" autocomplete="off" />
          <BaseInput class="md:col-span-2" label="ORCID" v-model="form.orcid" placeholder="0000-0000-0000-0000" :error="errors.orcid" autocomplete="off" />
          <BaseInput label="Password" v-model="form.password" type="password" placeholder="Create a password" :error="errors.password" autocomplete="new-password" show-password-toggle />
          <BaseInput label="Password confirmation" v-model="form.confirm" type="password" placeholder="Repeat a password" :error="errors.confirm" autocomplete="new-password" show-password-toggle />
        </div>
        <button
          type="submit"
          class="mt-8 w-full rounded-2xl bg-primary px-6 py-3 text-lg font-semibold text-white transition hover:bg-primary-dark"
        >
          Register
        </button>
        <p class="mt-6 text-center text-sm text-muted">
          Already have an account?
          <RouterLink to="/login" class="font-semibold text-primary hover:text-secondary">
            Log in
          </RouterLink>
        </p>
      </form>
    </section>
  </div>
</template>

