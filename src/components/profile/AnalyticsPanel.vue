<script setup>
defineProps({
  analytics: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="rounded-2xl bg-white p-6 shadow-card">
    <header class="mb-6 flex items-center justify-between">
      <div>
        <h3 class="text-2xl font-bold text-primary-dark">Indexes</h3>
      </div>
    </header>
    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl bg-surface p-4 text-center">
        <p class="text-sm text-muted">Index</p>
        <p class="text-3xl font-bold text-primary-dark">{{ analytics.index }}</p>
      </div>
      <div class="rounded-2xl bg-surface p-4 text-center">
        <p class="text-sm text-muted">Average</p>
        <p class="text-3xl font-bold text-primary-dark">{{ analytics.average }}</p>
      </div>
      <div class="flex items-center justify-center rounded-2xl bg-surface p-4 text-center">
        <div>
          <p class="text-sm text-muted">{{ analytics.performance }}</p>
          <div class="mt-2 h-16 w-16 rounded-full border-[10px] border-secondary border-t-primary-dark border-r-secondary/40 border-b-secondary/60 border-l-secondary/80" />
        </div>
      </div>
    </div>
  </section>
</template>

