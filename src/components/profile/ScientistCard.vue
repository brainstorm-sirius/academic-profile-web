<script setup>
defineProps({
  scientist: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="rounded-2xl bg-white p-6 shadow-card">
    <div class="flex flex-col items-center text-center">
      <img
        src="/src/assets/img/brain_icon.svg"
        alt="avatar"
        class="mb-4 h-28 w-28 rounded-full object-cover shadow-md"
      />
      <p class="text-xs uppercase tracking-[0.4em] text-secondary">ORCID</p>
      <p class="mb-1 text-sm font-semibold text-primary-dark">{{ scientist.orcid }}</p>
      <h2 class="mb-1 text-2xl font-bold text-primary-dark">{{ scientist.name }}</h2>
      <p class="text-sm text-black">{{ scientist.username }}</p>
      <p class="text-sm text-muted">{{ scientist.affiliation }}</p>
      <p class="mt-2 text-base font-medium text-primary-dark">{{ scientist.role }}</p>
      <p class="mt-4 text-sm leading-relaxed text-slate-600">
        {{ scientist.about }}
      </p>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-3">
      <div
        v-for="metric in scientist.metrics"
        :key="metric.label"
        class="rounded-2xl bg-surface p-4 text-center"
      >
        <p class="uppercase tracking-wide text-muted" style="font-size: 8px;">{{ metric.label }}</p>
        <p class="text-2xl font-bold text-primary-dark" style="font-size: 20px;">{{ metric.value }}</p>
      </div>
    </div>
  </section>
</template>

