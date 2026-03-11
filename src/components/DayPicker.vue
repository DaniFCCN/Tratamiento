<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <header class="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
      <p class="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <span>📅</span>
        Selecciona el día
      </p>
    </header>
    <div class="p-4">
      <label for="day-picker" class="block text-sm font-medium text-slate-700 mb-1">Fecha</label>
      <input
        id="day-picker"
        v-model="localDate"
        type="date"
        class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none transition-colors"
        :max="maxDate"
        @change="emitDate"
      />
      <p v-if="selectedLabel" class="mt-2 text-sm text-slate-600">
        {{ selectedLabel }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const today = new Date().toISOString().slice(0, 10)
const maxDate = computed(() => today)

const localDate = ref(props.modelValue || today)

watch(() => props.modelValue, (val) => {
  if (val && val !== localDate.value) localDate.value = val
})

const selectedLabel = computed(() => {
  if (!localDate.value) return ''
  const d = new Date(localDate.value + 'T12:00:00')
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return d.toLocaleDateString('es-ES', options)
})

function emitDate() {
  emit('update:modelValue', localDate.value)
}
</script>
