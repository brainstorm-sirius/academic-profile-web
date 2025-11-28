<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  topics: {
    type: Array,
    default: () => []
  }
})

const chartData = computed(() => ({
  labels: props.topics.map((topic) => topic.label),
  datasets: [
    {
      data: props.topics.map((topic) => topic.value),
      backgroundColor: props.topics.map((topic) => topic.color),
      borderWidth: 0
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '64%',
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <section class="rounded-2xl bg-white p-6 shadow-card">
    <header class="mb-4">
      <h3 class="text-2xl font-bold text-primary-dark">Publication topics</h3>
    </header>

    <div class="flex flex-col flex-align-center gap-6 lg:flex-row">
      <ul class="flex flex-1 flex-col justify-center gap-3">
        <li
          v-for="topic in topics"
          :key="topic.label"
          class="flex items-center justify-between rounded-xl bg-surface px-4 py-3"
        >
          <div class="flex items-center gap-3">
            <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: topic.color }" />
            <p class="text-sm font-semibold text-primary-dark">{{ topic.label }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

