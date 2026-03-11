<template>
  <div class="w-full pt-2">
    <h2 class="text-lg font-semibold text-slate-800 mb-1">Análisis</h2>
    <p class="text-sm text-slate-500 mb-4">
      Resumen de tu registro de salud.
    </p>

    <div v-if="stats.totalDays === 0" class="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500 text-sm">
      Aún no hay datos. Registra días en <router-link to="/diario" class="text-accent-600 font-medium hover:underline">Hoy</router-link> para ver estadísticas.
    </div>

    <template v-else>
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p class="text-2xl font-bold text-slate-800">{{ stats.totalDays }}</p>
          <p class="text-xs text-slate-500 mt-0.5">Días registrados</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p class="text-2xl font-bold text-slate-800">{{ stats.daysWithSymptoms }}</p>
          <p class="text-xs text-slate-500 mt-0.5">Días con síntomas</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p class="text-2xl font-bold text-slate-800">{{ stats.totalSymptoms }}</p>
          <p class="text-xs text-slate-500 mt-0.5">Total síntomas</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p class="text-2xl font-bold text-slate-800">{{ stats.avgSymptomsPerDay }}</p>
          <p class="text-xs text-slate-500 mt-0.5">Síntomas/día (media)</p>
        </div>
      </div>

      <h3 class="text-base font-semibold text-slate-800 mt-5 mb-3">Medicación</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-center">
          <p class="text-2xl font-bold text-slate-800">{{ stats.daysMedMorningOk }}</p>
          <p class="text-xs text-slate-600 mt-0.5">Mañana tomada</p>
        </div>
        <button
          type="button"
          class="rounded-xl border border-red-200 bg-red-50/50 p-4 text-center cursor-pointer hover:bg-red-100/80 transition-colors text-left"
          :disabled="stats.daysMedMorningMissed === 0"
          @click="openModal('morning')"
        >
          <p class="text-2xl font-bold text-red-600">{{ stats.daysMedMorningMissed }}</p>
          <p class="text-xs text-slate-600 mt-0.5">Mañana olvidada</p>
          <p v-if="stats.daysMedMorningMissed > 0" class="text-xs text-red-500 mt-1">Pulsa para ver días</p>
        </button>
        <div class="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-center">
          <p class="text-2xl font-bold text-slate-800">{{ stats.daysMedEveningOk }}</p>
          <p class="text-xs text-slate-600 mt-0.5">Noche tomada</p>
        </div>
        <button
          type="button"
          class="rounded-xl border border-red-200 bg-red-50/50 p-4 text-center cursor-pointer hover:bg-red-100/80 transition-colors text-left"
          :disabled="stats.daysMedEveningMissed === 0"
          @click="openModal('evening')"
        >
          <p class="text-2xl font-bold text-red-600">{{ stats.daysMedEveningMissed }}</p>
          <p class="text-xs text-slate-600 mt-0.5">Noche olvidada</p>
          <p v-if="stats.daysMedEveningMissed > 0" class="text-xs text-red-500 mt-1">Pulsa para ver días</p>
        </button>
      </div>

      <button
        type="button"
        class="w-full rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-center cursor-pointer hover:bg-amber-100/80 transition-colors text-left mt-4"
        :disabled="stats.daysWithAnyMissed === 0"
        @click="openModal('any')"
      >
        <p class="text-2xl font-bold text-amber-700">{{ stats.daysWithAnyMissed }}</p>
        <p class="text-xs text-slate-600 mt-0.5">Días con al menos un olvido de toma</p>
        <p v-if="stats.daysWithAnyMissed > 0" class="text-xs text-amber-600 mt-1">Pulsa para ver días</p>
      </button>

      <div class="rounded-xl border border-slate-200 bg-white p-4 text-center mt-4 shadow-sm">
        <p class="text-2xl font-bold text-slate-800">{{ stats.daysWithComments }}</p>
        <p class="text-xs text-slate-500 mt-0.5">Días con comentarios</p>
      </div>
    </template>

    <!-- Modal detalle olvidos -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalOpen"
          class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 md:pt-24 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          @click.self="closeModal"
        >
          <div
            class="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
            @click.stop
          >
            <div class="flex items-center justify-between px-4 py-3 border-b border-slate-200 shrink-0">
              <h2 id="modal-title" class="text-lg font-semibold text-slate-800">
                {{ modalTitle }}
              </h2>
              <button
                type="button"
                class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label="Cerrar"
                @click="closeModal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="overflow-auto flex-1 min-h-0">
              <table class="w-full text-sm">
                <thead class="bg-slate-50 sticky top-0">
                  <tr>
                    <th class="px-4 py-2.5 text-left font-medium text-slate-600">Fecha</th>
                    <th v-if="modalType === 'any'" class="px-4 py-2.5 text-left font-medium text-slate-600">Olvido</th>
                    <th class="px-4 py-2.5 text-right font-medium text-slate-600 w-24">Ver</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr
                    v-for="date in modalDates"
                    :key="date"
                    class="hover:bg-slate-50/80"
                  >
                    <td class="px-4 py-2.5 text-slate-800">{{ formatDate(date) }}</td>
                    <td v-if="modalType === 'any'" class="px-4 py-2.5 text-slate-600">{{ getMissedLabel(date) }}</td>
                    <td class="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        class="px-3 py-1.5 rounded-lg bg-accent-500 text-white text-xs font-medium hover:bg-accent-600 transition-colors"
                        @click="goToDay(date)"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-if="modalDates.length === 0" class="px-4 py-6 text-center text-slate-500 text-sm">
                No hay días en esta lista.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnalytics } from '../composables/useAnalytics.js'

const router = useRouter()
const {
  stats,
  datesMorningMissed,
  datesEveningMissed,
  datesAnyMissed,
  getMissedLabel
} = useAnalytics()

const modalOpen = ref(false)
const modalType = ref('morning') // 'morning' | 'evening' | 'any'

const modalTitle = computed(() => {
  if (modalType.value === 'morning') return 'Días con olvido de medicación (mañana)'
  if (modalType.value === 'evening') return 'Días con olvido de medicación (noche)'
  return 'Días con al menos un olvido de toma'
})

const modalDates = computed(() => {
  if (modalType.value === 'morning') return datesMorningMissed.value
  if (modalType.value === 'evening') return datesEveningMissed.value
  return datesAnyMissed.value
})

function openModal(type) {
  modalType.value = type
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function goToDay(date) {
  const today = new Date().toISOString().slice(0, 10)
  router.push(date === today ? { name: 'Diario' } : { name: 'DiarioFecha', params: { date } })
  closeModal()
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date().toISOString().slice(0, 10)
  if (dateStr === today) return 'Hoy'
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (dateStr === yesterday.toISOString().slice(0, 10)) return 'Ayer'
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
button:disabled {
  cursor: default;
  opacity: 0.9;
}
button:disabled:hover {
  background-color: rgb(254 242 242 / 0.5);
}
</style>
