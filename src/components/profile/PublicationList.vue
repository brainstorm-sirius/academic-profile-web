<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  publications: {
    type: Array,
    default: () => []
  },
  years: {
    type: Array,
    default: () => []
  },
  sorter: {
    type: Function,
    required: true
  }
})

const sortKey = ref('citations')
const yearFilter = ref('all')
const items = ref(props.sorter(sortKey.value, yearFilter.value))

watch([sortKey, yearFilter], () => {
  items.value = props.sorter(sortKey.value, yearFilter.value)
})

const sortLabels = {
  citations: 'By citations',
  year: 'By year',
  title: 'By name'
}
</script>

<template>
  <section id="publications" class="rounded-2xl bg-white p-6 shadow-card">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h3 class="text-2xl font-bold text-primary-dark">All publications</h3>
      </div>
      <div class="flex flex-wrap gap-3">
        <select
          v-model="sortKey"
          class="rounded-2xl border border-border bg-surface px-4 py-2 text-sm font-medium text-primary-dark"
        >
          <option v-for="(label, key) in sortLabels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
        <select
          v-model="yearFilter"
          class="rounded-2xl border border-border bg-surface px-4 py-2 text-sm font-medium text-primary-dark"
        >
          <option value="all">All years</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </header>

    <div class="space-y-4 overflow-hidden rounded-2xl bg-surface/60 p-4">
      <article
        v-for="publication in items"
        :key="publication.id"
        class="rounded-2xl bg-white px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h4 class="text-xl font-semibold text-primary-dark">{{ publication.title }}</h4>
            <p class="text-sm text-muted">
              {{ publication.journal }} · {{ publication.year }}
            </p>
            <p class="mt-2 text-sm text-slate-600">
              {{ publication.summary }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-primary-dark">{{ publication.citations }}</p>
            <p class="text-sm text-muted">citations</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

