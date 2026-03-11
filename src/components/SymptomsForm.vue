<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <header class="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
      <p class="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <span>🩺</span>
        Síntomas del día
      </p>
    </header>
    <div class="p-4">
      <p class="text-sm font-medium text-slate-700 mb-2">Añadir síntoma</p>
      <div class="flex gap-2">
        <input
          v-model="newSymptom"
          type="text"
          class="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none"
          placeholder="Ej: Dolor de cabeza, fatiga..."
          @keydown.enter.prevent="add"
        />
        <button
          type="button"
          class="shrink-0 px-4 py-2.5 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="!newSymptom.trim()"
          @click="add"
        >
          Añadir
        </button>
      </div>

      <p v-if="symptoms.length" class="text-sm font-medium text-slate-700 mt-4 mb-2">Lista de síntomas</p>
      <div v-if="symptoms.length" class="space-y-2">
        <div
          v-for="s in symptoms"
          :key="s.id"
          class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5"
        >
          <span v-if="!editingId || editingId !== s.id" class="flex-1 text-slate-800">{{ s.text }}</span>
          <input
            v-else
            :ref="el => editInputRef = el"
            v-model="editText"
            type="text"
            class="flex-1 rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 focus:outline-none"
            @keydown.enter="saveEdit(s.id)"
            @keydown.esc="cancelEdit"
          />
          <div class="flex items-center gap-1 shrink-0">
            <button
              v-if="!editingId || editingId !== s.id"
              type="button"
              class="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
              title="Editar"
              @click="startEdit(s)"
            >
              ✏️
            </button>
            <button
              v-else
              type="button"
              class="px-2 py-1 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600"
              @click="saveEdit(s.id)"
            >
              Guardar
            </button>
            <button
              type="button"
              class="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              title="Eliminar"
              @click="remove(s.id)"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-slate-400 mt-2">No hay síntomas registrados para este día.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  symptoms: { type: Array, default: () => [] }
})

const emit = defineEmits(['add', 'remove', 'update'])

const newSymptom = ref('')
const editingId = ref(null)
const editText = ref('')
let editInputRef = null

function add() {
  const text = newSymptom.value.trim()
  if (text) {
    emit('add', text)
    newSymptom.value = ''
  }
}

function remove(id) {
  emit('remove', id)
}

function startEdit(s) {
  editingId.value = s.id
  editText.value = s.text
  nextTick(() => {
    const el = Array.isArray(editInputRef) ? editInputRef[0] : editInputRef
    el?.focus()
  })
}

function saveEdit(id) {
  if (editText.value.trim()) {
    emit('update', id, editText.value.trim())
  }
  cancelEdit()
}

function cancelEdit() {
  editingId.value = null
  editText.value = ''
}

watch(() => props.symptoms, () => {
  editingId.value = null
}, { deep: true })
</script>
