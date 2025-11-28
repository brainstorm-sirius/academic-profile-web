<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const navItems = [
  { label: 'Dashboard', path: '/profile' },
  { label: 'Collaboration', path: '/profile#collaboration' }
]

function logout() {
  router.push('/login')
}
</script>

<template>
  <aside
    class="hidden min-h-screen w-72 flex-shrink-0 justify-between bg-white/90 px-6 py-10 shadow-card lg:flex h-screen sticky top-0"
  >
    <div class="flex flex-col justify-between">
      <div>
      <div class="mb-10 flex items-center gap-3">
        <div>
            <img src="@/assets/img/sirius_university_logo_color.svg" alt="Sirius University" class="w-100">
        </div>
      </div>

      <nav class="space-y-2">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.path"
          class="block rounded-xl px-4 py-3 text-base font-medium transition hover:bg-secondary/20 hover:text-primary"
        >
          {{ item.label }}
        </a>
      </nav>
      </div>
      <div class="logout cursor-pointer" @click="logout">
        <p class="logout-text">Log out</p>
      </div>
    </div>
  </aside>
</template>

