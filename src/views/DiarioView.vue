<template>
  <div class="w-full space-y-4 pt-2">
    <DayPicker v-model="selectedDate" />

    <SymptomsForm
      :symptoms="entry.symptoms"
      @add="onAddSymptom"
      @remove="onRemoveSymptom"
      @update="onUpdateSymptom"
    />

    <MedicationCheck
      :med-morning="entry.medMorning"
      :med-evening="entry.medEvening"
      @update:med-morning="onMedMorning"
      @update:med-evening="onMedEvening"
    />

    <CommentsField :model-value="entry.comments" @update:model-value="onComments" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DayPicker from '../components/DayPicker.vue'
import SymptomsForm from '../components/SymptomsForm.vue'
import MedicationCheck from '../components/MedicationCheck.vue'
import CommentsField from '../components/CommentsField.vue'
import { useDiary } from '../composables/useDiary.js'

const route = useRoute()
const router = useRouter()
const { getEntry, addSymptom, removeSymptom, updateSymptom, setMedMorning, setMedEvening, setComments } = useDiary()

const today = new Date().toISOString().slice(0, 10)
const selectedDate = ref(route.params.date || today)

watch(() => route.params.date, (date) => {
  if (date) selectedDate.value = date
}, { immediate: true })

watch(selectedDate, (date) => {
  if (route.name === 'DiarioFecha' && route.params.date !== date) {
    router.replace(date === today ? { name: 'Diario' } : { name: 'DiarioFecha', params: { date } })
  }
})

const entry = computed(() => getEntry(selectedDate.value))

function onAddSymptom(text) {
  addSymptom(selectedDate.value, text)
}

function onRemoveSymptom(id) {
  removeSymptom(selectedDate.value, id)
}

function onUpdateSymptom(id, text) {
  updateSymptom(selectedDate.value, id, text)
}

function onMedMorning(value) {
  setMedMorning(selectedDate.value, value)
}

function onMedEvening(value) {
  setMedEvening(selectedDate.value, value)
}

function onComments(value) {
  setComments(selectedDate.value, value)
}
</script>
