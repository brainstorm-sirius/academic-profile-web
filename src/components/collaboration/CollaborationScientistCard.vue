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
  router.push(`/author?id=${props.scientist.author_id}`)
}

const getValue = (value) => {
  return value !== null && value !== undefined && value !== '' ? (typeof value == "number" ? Math.round(value * 100, 2) / 100 : value) : 'N/A'
}
</script>

<template>
  <article
    class="flex gap-4 rounded-2xl bg-white p-4 shadow-card transition hover:shadow-lg cursor-pointer"
    @click="goToAuthor"
  >
    <div class="flex-shrink-0">
      <img
        src="/src/assets/img/avatar.png"
        :alt="getValue(scientist.author_name)"
        class="h-20 w-20 rounded-lg object-cover"
      />
      <h3 class="mt-2 text-sm font-semibold text-primary-dark">{{ getValue(scientist.author_name) }}</h3>
    </div>

    <div class="flex-1">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <p class="mb-2 text-xs font-medium text-muted">Main Interest</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-xs font-medium text-primary-dark">{{ getValue(scientist.main_interest) }}</span>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs font-medium text-muted">Total Score</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-sm font-semibold text-primary-dark">{{ getValue(scientist.total_score) }}</span>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs font-medium text-muted">Similarity Score</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-sm font-semibold text-primary-dark">{{ getValue(scientist.similarity_score) }}</span>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs font-medium text-muted">Productivity Score</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-sm font-semibold text-primary-dark">{{ getValue(scientist.productivity_score) }}</span>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs font-medium text-muted">Diversity Score</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-sm font-semibold text-primary-dark">{{ getValue(scientist.diversity_score) }}</span>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs font-medium text-muted">Articles Count</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-sm font-semibold text-primary-dark">{{ getValue(scientist.articles_count) }}</span>
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs font-medium text-muted">Interests Count</p>
          <div class="inline-block rounded-lg bg-secondary/20 px-3 py-1">
            <span class="text-sm font-semibold text-primary-dark">{{ getValue(scientist.interests_count) }}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>




