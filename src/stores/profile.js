import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const scientist = ref({
    name: 'Egor Petryaev',
    role: 'Scientist, Artificial Intelligence Laboratory',
    affiliation: 'Sirius University',
    orcid: '0000-0002-3740-1122',
    about:
      'Исследую приложения генеративных моделей для климатического моделирования и устойчивой энергетики. Руководитель инициатив по цифровым двойникам научных лабораторий.',
    metrics: [
      { label: 'H-Index', value: '28' },
      { label: 'Citations', value: '2540' },
      { label: 'Publications', value: '64' }
    ]
  })

  const analytics = ref({
    index: 3.5,
    average: 3.5,
    performance: 'Overall Performance'
  })

  const citationSeries = ref([
    { year: 2018, value: 120 },
    { year: 2019, value: 185 },
    { year: 2020, value: 310 },
    { year: 2021, value: 420 },
    { year: 2022, value: 515 },
    { year: 2023, value: 690 },
    { year: 2024, value: 830 }
  ])

  const topicDistribution = ref([
    { label: 'Artificial intelligence', value: 32, color: '#5BC0F8' },
    { label: 'Климатические модели', value: 24, color: '#142850' },
    { label: 'Устойчивая энергия', value: 18, color: '#F2A541' },
    { label: 'Квантовые алгоритмы', value: 14, color: '#7C3AED' },
    { label: 'Биоинформатика', value: 12, color: '#38B2AC' }
  ])

  const collaborators = ref([
    { name: 'Анна Крылова', field: 'Нейроархитектуры', weight: 1.0 },
    { name: 'Сергей Ефимов', field: 'Климатология', weight: 0.8 },
    { name: 'Марк Панов', field: 'Робототехника', weight: 0.7 },
    { name: 'Виктория Ли', field: 'Квантовые вычисления', weight: 0.6 },
    { name: 'Ирина Плотникова', field: 'Биоинформатика', weight: 0.65 }
  ])

  const publications = ref([
    {
      id: 1,
      title: 'Direct Air Capture Integrated Car',
      journal: 'Sirius Journal of Applied Physics',
      year: 2024,
      citations: 134,
      summary:
        'Инженерная архитектура мобильного комплекса прямого захвата углерода для сверхгородской среды.'
    },
    {
      id: 2,
      title: 'Adaptive Learning for Climate Twins',
      journal: 'AI for Earth Systems',
      year: 2023,
      citations: 212,
      summary:
        'Методы самообучения генеративных моделей для прогнозирования климата на горизонте 30 лет.'
    },
    {
      id: 3,
      title: 'Neural Catalysts for Hydrogen Storage',
      journal: 'Energy Science Letters',
      year: 2022,
      citations: 176,
      summary:
        'Нейросетевые рекомендации для дизайна катализаторов хранения водорода с молекулярной точностью.'
    },
    {
      id: 4,
      title: 'AI Safety Layers for Lab Automation',
      journal: 'Computational Experiments',
      year: 2021,
      citations: 88,
      summary:
        'Фреймворк цифровых двойников лабораторий с управляемыми агентами и безопасностью экспериментов.'
    },
    {
      id: 5,
      title: 'Swarm Intelligence for Arctic Studies',
      journal: 'Robotics & Autonomous Systems',
      year: 2020,
      citations: 142,
      summary:
        'Рой автономных дронов для мониторинга ледовой обстановки и оценки угольного следа кораблей.'
    }
  ])

  const years = computed(() =>
    Array.from(new Set(publications.value.map((p) => p.year))).sort((a, b) => b - a)
  )

  const sortPublications = (key = 'citations', year = 'all') => {
    let filtered = [...publications.value]
    if (year !== 'all') {
      filtered = filtered.filter((item) => item.year === Number(year))
    }

    return filtered.sort((a, b) => {
      if (key === 'title') {
        return a.title.localeCompare(b.title)
      }
      return b[key] - a[key]
    })
  }

  return {
    scientist,
    analytics,
    citationSeries,
    topicDistribution,
    collaborators,
    publications,
    years,
    sortPublications
  }
})

