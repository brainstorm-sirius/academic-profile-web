import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useInterestsStore } from './interests'

export const useProfileStore = defineStore('profile', () => {
  const interestsStore = useInterestsStore()
  const scientist = ref({
    username: 'EgorPetryaev',
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

  // Color palette for interests
  const colorPalette = [
    '#5BC0F8', // secondary blue
    '#142850', // dark blue
    '#F2A541', // accent orange
    '#7C3AED', // purple
    '#38B2AC', // teal
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // amber
    '#8B5CF6', // violet
    '#EC4899'  // pink
  ]

  // Generate consistent color for an interest based on its name
  const getInterestColor = (interestName) => {
    let hash = 0
    for (let i = 0; i < interestName.length; i++) {
      hash = interestName.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colorPalette[Math.abs(hash) % colorPalette.length]
  }

  // Compute topicDistribution from selectedInterests
  const topicDistribution = computed(() => {
    const selected = interestsStore.selectedInterests
    if (selected.length === 0) {
      // Return empty array or default values if no interests selected
      return []
    }
    
    // Calculate values based on order (first selected gets highest value)
    const total = selected.length
    return selected.map((interest, index) => ({
      label: interest,
      value: Math.max(10, 100 - (index * (90 / total))), // Distribute values from 100 to 10
      color: getInterestColor(interest)
    }))
  })

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

