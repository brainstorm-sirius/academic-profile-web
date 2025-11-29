<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useKnowledgeGraphStore } from '@/stores/knowledgeGraph'
import ProfileSidebar from '@/components/profile/ProfileSidebar.vue'
import KnowledgeGraph from '@/components/charts/KnowledgeGraph.vue'

const knowledgeGraphStore = useKnowledgeGraphStore()
const { graphData, loading, error } = storeToRefs(knowledgeGraphStore)
const { fetchGraphData } = knowledgeGraphStore

onMounted(() => {
  fetchGraphData()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface lg:flex-row">
    <ProfileSidebar />
    <main class="flex-1 px-4 py-8 lg:px-10">
      <header class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-primary-dark">Граф знаний</h1>
        <p class="text-muted">
          Визуализация связей между учеными и областями их интересов. Крупные вершины - области
          интересов, мелкие - ученые.
        </p>
      </header>

      <div v-if="loading" class="flex h-full items-center justify-center py-20">
        <div class="text-center">
          <div class="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p class="text-lg font-semibold text-primary-dark">Загрузка графа знаний...</p>
        </div>
      </div>

      <div v-else class="space-y-6">
        <!-- Показываем предупреждение об ошибке, если есть, но данные загружены -->
        <div v-if="error && graphData.nodes.length > 0" class="rounded-2xl bg-yellow-50 border border-yellow-200 p-4 shadow-card">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-yellow-800">Используются тестовые данные</p>
              <p class="text-xs text-yellow-700 mt-1">{{ error }}</p>
              <p class="text-xs text-yellow-600 mt-1">
                Убедитесь, что backend предоставляет endpoint /knowledge-graph
              </p>
            </div>
            <button
              class="rounded-xl bg-yellow-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-yellow-700"
              @click="fetchGraphData"
            >
              Обновить
            </button>
          </div>
        </div>

        <!-- Показываем ошибку только если нет данных -->
        <div v-if="error && graphData.nodes.length === 0" class="rounded-2xl bg-white p-6 shadow-card">
          <div class="flex flex-col items-center justify-center gap-4 py-10">
            <p class="text-lg font-semibold text-primary-dark">Ошибка загрузки</p>
            <p class="text-sm text-muted">{{ error }}</p>
            <button
              class="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-primary-dark"
              @click="fetchGraphData"
            >
              Попробовать снова
            </button>
          </div>
        </div>

        <!-- Показываем граф, если есть данные -->
        <div v-if="graphData.nodes.length > 0" class="space-y-6">
        <div class="rounded-2xl bg-white shadow-card overflow-hidden">
          <div class="p-6 pb-4 flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded border-2 border-[#142850] bg-[#5BC0F8]"></div>
              <span class="text-sm font-medium text-primary-dark">Области интересов</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 rounded-full bg-[#7C3AED] border-2 border-[#5BC0F8]"></div>
              <span class="text-sm font-medium text-primary-dark">Ученые</span>
            </div>
          </div>
          
          <div class="px-6 pb-6">
            <KnowledgeGraph :nodes="graphData.nodes" :edges="graphData.edges" />
          </div>
        </div>

        <div class="grid gap-4 rounded-2xl bg-white p-6 shadow-card md:grid-cols-2">
          <div>
            <p class="mb-2 text-sm font-semibold text-primary-dark">Статистика графа</p>
            <div class="space-y-2 text-sm text-muted">
              <p>Областей интересов: {{ graphData.nodes.filter(n => n.group === 'interest').length }}</p>
              <p>Ученых: {{ graphData.nodes.filter(n => n.group === 'scientist').length }}</p>
              <p>Связей: {{ graphData.edges.length }}</p>
            </div>
          </div>
          <div>
            <p class="mb-2 text-sm font-semibold text-primary-dark">Инструкции</p>
            <ul class="space-y-1 text-xs text-muted">
              <li>• Перетаскивайте узлы для изменения расположения</li>
              <li>• Используйте колесико мыши для масштабирования</li>
              <li>• Наведите курсор на узел для получения информации</li>
              <li>• Кликните на узел для выделения</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

