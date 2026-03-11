<template>
  <div class="w-full pt-2">
    <h2 class="text-lg font-semibold text-slate-800 mb-1">Historial de días</h2>
    <p class="text-sm text-slate-500 mb-4">
      Días con registro. Toca uno para ver o editar.
    </p>

    <div v-if="!sortedDates.length" class="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500 text-sm">
      Aún no hay ningún día registrado. Ve a <router-link to="/diario" class="text-accent-600 font-medium hover:underline">Hoy</router-link> para empezar.
    </div>

    <div v-else class="space-y-3">
      <router-link
        v-for="date in sortedDates"
        :key="date"
        :to="date === today ? { name: 'Diario' } : { name: 'DiarioFecha', params: { date } }"
        class="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-slate-800 no-underline transition-all hover:shadow-md hover:border-slate-300"
      >
        <div class="flex justify-between items-start gap-3">
          <div class="min-w-0">
            <strong class="text-slate-900">{{ formatDate(date) }}</strong>
            <p v-if="summary(date).symptomsCount" class="mt-1 mb-0 text-xs text-slate-600 flex items-center gap-1">
              <span>🩺</span>
              {{ summary(date).symptomsCount }} síntoma(s)
            </p>
          </div>
          <div class="flex flex-col gap-1 items-end shrink-0">
            <span
              class="text-xs px-2 py-0.5 rounded-full font-medium"
              :class="summary(date).medMorning ? 'bg-accent-50 text-accent-700' : 'bg-slate-100 text-slate-500'"
              title="Medicación mañana"
            >
              {{ summary(date).medMorning ? '✓ Mañana' : '— Mañana' }}
            </span>
            <span
              class="text-xs px-2 py-0.5 rounded-full font-medium"
              :class="summary(date).medEvening ? 'bg-accent-50 text-accent-700' : 'bg-slate-100 text-slate-500'"
              title="Medicación noche"
            >
              {{ summary(date).medEvening ? '✓ Noche' : '— Noche' }}
            </span>
          </div>
        </div>
        <p v-if="summary(date).commentsPreview" class="mt-2 text-xs text-slate-500 truncate">
          {{ summary(date).commentsPreview }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDiary } from '../composables/useDiary.js'

const { entries, getEntry } = useDiary()

const today = new Date().toISOString().slice(0, 10)

const sortedDates = computed(() => {
  return Object.keys(entries.value).sort((a, b) => b.localeCompare(a))
})

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  const todayStr = today
  if (dateStr === todayStr) return 'Hoy'
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (dateStr === yesterday.toISOString().slice(0, 10)) return 'Ayer'
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function summary(date) {
  const e = getEntry(date)
  const symptoms = e.symptoms || []
  const comments = (e.comments || '').trim()
  return {
    symptomsCount: symptoms.length,
    medMorning: !!e.medMorning,
    medEvening: !!e.medEvening,
    commentsPreview: comments ? (comments.slice(0, 60) + (comments.length > 60 ? '…' : '')) : ''
  }
}
</script>
