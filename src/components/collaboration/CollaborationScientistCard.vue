<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  scientist: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToAuthor = () => {
  router.push(`/author?id=${props.scientist.id}`)
}
</script>

<template>
  <article
    class="flex gap-4 rounded-2xl bg-white p-4 shadow-card transition hover:shadow-lg cursor-pointer"
    @click="goToAuthor"
  >
    <div class="flex-shrink-0">
      <img
        :src="scientist.avatar || '/src/assets/img/brain_icon.svg'"
        :alt="scientist.name"
        class="h-20 w-20 rounded-lg object-cover"
      />
      <h3 class="mt-2 text-sm font-semibold text-primary-dark">{{ scientist.name }}</h3>
      <p class="text-xs text-muted">{{ scientist.affiliation }}</p>
    </div>

    <div class="flex-1 space-y-3">
      <div>
        <p class="mb-2 text-xs font-medium text-muted">Main Topic</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="topic in scientist.topics"
            :key="topic"
            class="rounded-lg bg-secondary/20 px-3 py-1 text-xs font-medium text-primary-dark"
          >
            {{ topic }}
          </span>
        </div>
      </div>

      <div>
        <p class="mb-2 text-xs font-medium text-muted">H Index</p>
        <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
          <span class="text-sm font-semibold text-primary-dark">{{ scientist.hIndex }}</span>
        </div>
      </div>

      <div>
        <p class="mb-2 text-xs font-medium text-muted">Publications</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="publication in scientist.publications"
            :key="publication"
            class="rounded-lg bg-secondary/20 px-3 py-1 text-xs font-medium text-primary-dark"
          >
            {{ publication }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

